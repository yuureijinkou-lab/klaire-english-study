// SPDX-License-Identifier: GPL-3.0-or-later
importScripts('./speech-generator.js');

self.onmessage = ({ data: { id, text, voice, speed } }) => {
  try {
    const samples = generateSpeech(text, { voice, speed });
    const wav = samples.buffer;
    self.postMessage({ id, wav }, [wav]);
  } catch {
    self.postMessage({ id });
  }
};
