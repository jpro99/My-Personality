import './styles.css';
import { registerSW } from 'virtual:pwa-register';
import { decodeShare, validateSharePayload } from './lib/share.js';
import { renderShareView } from './ui/share-view.js';
import { initApp } from './ui/app.js';

registerSW({ immediate: true });

const payload = decodeShare();
if (payload && validateSharePayload(payload)) {
  renderShareView(payload);
} else {
  initApp();
}
