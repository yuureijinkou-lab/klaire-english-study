// Study records are plain JSON from local storage, backups, or the cloud.
export function cloneStudyData(value) {
  if (typeof globalThis.structuredClone === 'function') return globalThis.structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function studyUuid() {
  const crypto = globalThis.crypto;
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}

// Older Safari parses <dialog> but does not provide modal methods.
export function prepareStudyDialog(dialog) {
  if (typeof dialog.showModal === 'function') return;
  let previousFocus;
  const focusable = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]';
  Object.defineProperty(dialog, 'open', { get: () => dialog.hasAttribute('open') });
  dialog.setAttribute('data-legacy-modal', '');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.showModal = () => {
    previousFocus = document.activeElement;
    dialog.setAttribute('open', '');
    dialog.querySelector(focusable)?.focus();
  };
  dialog.close = () => {
    if (!dialog.open) return;
    dialog.removeAttribute('open');
    previousFocus?.focus();
    dialog.dispatchEvent(new Event('close'));
  };
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
    } else if (event.key === 'Tab') {
      const controls = Array.from(dialog.querySelectorAll(focusable)).filter(el => el.getClientRects().length);
      const edge = event.shiftKey ? controls[0] : controls[controls.length - 1];
      if (document.activeElement === edge) {
        event.preventDefault();
        (event.shiftKey ? controls[controls.length - 1] : controls[0])?.focus();
      }
    }
  });
}
