import { profiles } from '../data/content.js';
import { COLOR_ORDER } from '../lib/constants.js';
import { el, escapeHtml } from '../lib/dom.js';

export function renderBackgrounds(root) {
  const container = root.querySelector('#backgroundGrid');
  container.replaceChildren();
  for (const key of COLOR_ORDER) {
    const p = profiles[key];
    container.appendChild(
      el('div', { className: 'profile-box' }, [
        el('h3', { html: `<span class="tag ${p.className}">${escapeHtml(p.label)}</span>` }),
        el('p', { text: p.background }),
        el('p', { html: `<strong>What makes them tick:</strong> ${escapeHtml(p.ticks.join(' '))}` }),
        el('p', { html: `<strong>How to talk to them:</strong> ${escapeHtml(p.speakTo)}` }),
        el('p', { html: `<strong>Team value:</strong> ${escapeHtml(p.meeting)}` }),
      ]),
    );
  }
}
