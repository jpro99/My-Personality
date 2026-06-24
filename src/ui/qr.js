import QRCode from 'qrcode';

export async function renderQr(container, text) {
  container.replaceChildren();
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 140;
    canvas.height = 140;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'QR code for sharing your color profile');
    await QRCode.toCanvas(canvas, text, {
      width: 140,
      margin: 1,
      color: { dark: '#22201b', light: '#ffffff' },
    });
    container.appendChild(canvas);
  } catch {
    container.appendChild(
      Object.assign(document.createElement('p'), {
        className: 'small muted',
        textContent: 'QR unavailable — use the copy link button instead.',
      }),
    );
  }
}
