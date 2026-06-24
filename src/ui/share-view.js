import { studentLayers } from '../data/content.js';
import { escapeHtml, el, ul } from '../lib/dom.js';
import { getProfile } from '../lib/share.js';

export function renderShareView(payload) {
  const p = getProfile(payload.p);
  const s = getProfile(payload.s);
  if (!p || !s) {
    document.body.textContent = 'Invalid share link.';
    return;
  }
  const layer = studentLayers[payload.p];
  const name = escapeHtml(payload.n || 'Student');

  document.documentElement.lang = 'en';
  document.body.replaceChildren();
  document.body.className = 'share-body';

  const main = el('main', { className: 'app share-app' }, [
    el('header', { className: 'share-header' }, [
      el('a', { className: 'btn btn-secondary', href: './', text: '← Open full app' }),
    ]),
    el('section', { className: 'panel' }, [
      el('h1', { text: `${payload.n || 'Student'}: ${p.label} with ${s.label}` }),
      el('p', { className: 'muted', text: 'Shared communication card' }),
      el('div', { className: 'grid-2' }, [
        el('div', { className: 'lesson' }, [el('h3', { text: 'This is who I am' }), ul(layer.identity)]),
        el('div', { className: 'lesson' }, [el('h3', { text: 'How I talk' }), ul(layer.talk)]),
      ]),
      el('div', { className: 'grid-2 share-grid-gap' }, [
        el('div', { className: 'lesson' }, [
          el('h3', { text: 'Questions I naturally ask' }),
          ul(layer.questions),
          el('p', { text: layer.why }),
        ]),
        el('div', { className: 'lesson' }, [
          el('h3', { text: 'Why conflict can happen' }),
          el('p', {
            text: `${p.label}s often default to ${p.speakLike.toLowerCase()} ${s.label} influence may pull toward ${s.speakLike.toLowerCase()}`,
          }),
          el('p', {
            text: 'Arguments often happen when one person feels unheard and the other person feels misunderstood.',
          }),
        ]),
      ]),
      el('div', { className: 'grid-2 share-grid-gap' }, [
        el('div', { className: 'lesson' }, [
          el('h3', { text: 'How to do better' }),
          el('ul', {}, [
            el('li', { text: p.speakTo }),
            el('li', { text: 'Slow down long enough to name both needs and limits clearly.' }),
            el('li', {
              text: 'Ask: “What does this person need from me right now: warmth, order, logic, or action?”',
            }),
          ]),
        ]),
        el('div', { className: 'lesson' }, [
          el('h3', { text: 'Team use' }),
          el('p', {
            text: `Use this person where ${p.team[2].replace('Best role: ', '').toLowerCase()} matters, while also stretching the weaker colors through coaching.`,
          }),
          el('p', {
            html: `<strong>Strengths together:</strong> ${escapeHtml(p.label)} brings ${escapeHtml(p.ticks[0].toLowerCase())}, while ${escapeHtml(s.label)} brings ${escapeHtml(s.ticks[0].toLowerCase())}.`,
          }),
        ]),
      ]),
      el('p', { className: 'small muted disclaimer', text: name + ' — This is a teaching tool, not a clinical assessment.' }),
    ]),
  ]);

  document.body.appendChild(main);
}
