import './styles.css';
import { registerSW } from 'virtual:pwa-register';
import { decodeShare, validateSharePayload } from './lib/share.js';
import { renderShareView } from './ui/share-view.js';
import { initApp } from './ui/app.js';

try {
  registerSW({ immediate: true });
} catch {
  /* PWA optional */
}

try {
  const payload = decodeShare();
  if (payload && validateSharePayload(payload)) {
    renderShareView(payload);
  } else {
    initApp();
  }
} catch (err) {
  console.error(err);
  const banner = document.createElement('div');
  banner.className = 'warning';
  banner.style.margin = '16px';
  banner.textContent =
    'The app failed to start. Hard-refresh (Ctrl+Shift+R). If needed, ensure the site was built with npm run build.';
  document.body.prepend(banner);
}
