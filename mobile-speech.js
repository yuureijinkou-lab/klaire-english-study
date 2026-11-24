export function createMobileSpeech(onFailure) {
  let context, worker, pending, playing;
  let sequence = 0;

  const audioContext = () => window.AudioContext || window.webkitAudioContext;
  const available = () => Boolean(audioContext() && window.Worker);

  function fail(request) {
    if (!request || pending !== request) return;
    clearTimeout(request.timeout);
    pending = undefined;
    onFailure(request.text, request.slow);
  }

  async function receive({ data }) {
    const request = pending;
    if (!request || request.id !== data?.id) return;
    if (!data.wav) { fail(request); return; }
    try {
      const buffer = await context.decodeAudioData(data.wav);
      await request.resumed;
      if (pending !== request) return;
      const audio = context.createBufferSource();
      audio.buffer = buffer;
      audio.connect(context.destination);
      audio.onended = () => {
        audio.disconnect();
        if (playing === audio) playing = undefined;
      };
      audio.start();
      playing = audio;
      clearTimeout(request.timeout);
      pending = undefined;
    } catch {
      fail(request);
    }
  }

  function preload() {
    if (worker || !available()) return;
    try {
      worker = new window.Worker(new URL('./mobile-speech-worker.js', import.meta.url));
      worker.onmessage = receive;
      worker.onerror = () => {
        worker.terminate();
        worker = undefined;
        fail(pending);
      };
    } catch {
      worker = undefined;
    }
  }

  function stop() {
    if (pending) clearTimeout(pending.timeout);
    pending = undefined;
    if (playing) playing.stop();
    playing = undefined;
  }

  function play(text, slow, accent) {
    if (!available()) return false;
    stop();
    preload();
    if (!worker) return false;

    const session = window.navigator?.audioSession;
    if (session) {
      try { if (session.type !== 'playback') session.type = 'playback'; } catch {}
    }
    try {
      const Context = audioContext();
      if (!context || context.state === 'closed') context = new Context();
      // Resume during the click, before the worker returns asynchronously.
      const resumed = context.state === 'running' ? Promise.resolve() : context.resume();
      const request = { id: ++sequence, text, slow, resumed };
      pending = request;
      resumed.catch(() => fail(request));
      request.timeout = setTimeout(() => fail(request), 9000);
      worker.postMessage({ id: request.id, text, voice: accent === 'en-US' ? 'en/en-us' : 'en/en', speed: slow ? 125 : 165 });
      return true;
    } catch {
      stop();
      return false;
    }
  }

  return { available, play, preload, stop };
}
