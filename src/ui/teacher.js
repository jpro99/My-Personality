import { profiles } from '../data/content.js';
import { buildCode, exampleCode, formatCodeHelp, parseCode } from '../lib/codes.js';
import { escapeHtml, el } from '../lib/dom.js';
import { primarySecondary, validateManualTotals } from '../lib/scoring.js';

function analyzeTotals(totals, title = 'Decoded result') {
  const ps = primarySecondary(totals);
  const p = profiles[ps.primary];
  const s = profiles[ps.secondary];
  return el('div', { className: 'lesson' }, [
    el('h3', { text: title }),
    el('p', {
      html: `<span class="tag ${ps.primary}">${escapeHtml(p.label)}</span><span class="tag ${ps.secondary}">${escapeHtml(s.label)}</span>`,
    }),
    el('p', { html: `<strong>Code:</strong> ${escapeHtml(buildCode(totals))}` }),
    el('p', { html: `<strong>Primary need:</strong> ${escapeHtml(p.ticks[0])}` }),
    el('p', { html: `<strong>Likely conflict pattern:</strong> ${escapeHtml(p.watch)}` }),
    el('p', { html: `<strong>Best coaching move:</strong> ${escapeHtml(p.coach)}` }),
  ]);
}

function analyzePartnerAndTeam(totals) {
  const ps = primarySecondary(totals);
  const p = profiles[ps.primary];
  return el('div', { className: 'lesson' }, [
    el('h3', { text: 'Instant insight' }),
    el('p', {
      html: `<strong>Likely argument source:</strong> a strong ${escapeHtml(p.label)} under pressure may default to ${escapeHtml(p.speakLike.toLowerCase())}`,
    }),
    el('p', {
      html: `<strong>What to work on:</strong> ${escapeHtml(p.growth[0])} ${escapeHtml(p.growth[1])}`,
    }),
    el('p', {
      html: `<strong>Team placement:</strong> best when given ${escapeHtml(p.team[2].replace('Best role: ', ''))} duties while paired with people who cover the weaker colors.`,
    }),
    el('p', { html: `<strong>Partner reminder:</strong> ${escapeHtml(p.partner[0])}` }),
  ]);
}

export function initTeacherTools(root, { onWarn, onClearMessages }) {
  const output = root.querySelector('#teacherOutput');
  const help = root.querySelector('#codeFormatHelp');
  if (help) help.textContent = formatCodeHelp();

  const lookupInput = root.querySelector('#lookupCode');
  if (lookupInput) lookupInput.placeholder = `Example: ${exampleCode()}`;

  root.querySelector('#lookupBtn').addEventListener('click', () => {
    onClearMessages?.();
    const totals = parseCode(lookupInput.value.trim());
    output.replaceChildren();
    if (!totals) {
      output.appendChild(
        el('div', {
          className: 'warning',
          text: `Invalid code. Use format like ${exampleCode()}. Legacy B34-G29-R18-O19 also works.`,
        }),
      );
      return;
    }
    output.append(analyzeTotals(totals, 'Lookup by code'), analyzePartnerAndTeam(totals));
  });

  root.querySelector('#manualBtn').addEventListener('click', () => {
    onClearMessages?.();
    const totals = {
      blue: Number(root.querySelector('#manualBlue').value || 0),
      gold: Number(root.querySelector('#manualGold').value || 0),
      green: Number(root.querySelector('#manualGreen').value || 0),
      orange: Number(root.querySelector('#manualOrange').value || 0),
    };
    const err = validateManualTotals(totals);
    output.replaceChildren();
    if (err) {
      onWarn?.(err);
      output.appendChild(el('div', { className: 'warning', text: err }));
      return;
    }
    output.append(analyzeTotals(totals, 'Manual score analysis'), analyzePartnerAndTeam(totals));
  });

  root.querySelector('#teamBtn').addEventListener('click', () => {
    onClearMessages?.();
    const lines = root.querySelector('#teamCodes').value.split(/\n+/).map((x) => x.trim()).filter(Boolean);
    const totalsList = lines.map(parseCode).filter(Boolean);
    output.replaceChildren();
    if (!totalsList.length) {
      output.appendChild(el('div', { className: 'warning', text: 'Add at least one valid code.' }));
      return;
    }
    const primaries = totalsList.map((t) => primarySecondary(t).primary);
    const counts = { blue: 0, gold: 0, green: 0, orange: 0 };
    primaries.forEach((p) => counts[p]++);

    const advice = [];
    if (!counts.blue) advice.push('No strong Blue voice: team may miss morale, belonging, and emotional safety.');
    if (!counts.gold) advice.push('No strong Gold voice: team may miss structure, deadlines, and follow-through.');
    if (!counts.green) advice.push('No strong Green voice: team may miss logic, quality control, and sharp analysis.');
    if (!counts.orange) advice.push('No strong Orange voice: team may move too slowly or hesitate to act.');
    if (!advice.length) advice.push('This team has all four major primary styles represented, which usually improves balance.');

    output.append(
      el('div', { className: 'lesson' }, [
        el('h3', { text: 'Team composition' }),
        el('p', {
          html: `<strong>Primary color count:</strong> Blue ${counts.blue}, Gold ${counts.gold}, Green ${counts.green}, Orange ${counts.orange}`,
        }),
        el('ul', {}, advice.map((a) => el('li', { text: a }))),
        el('p', {
          text: 'Suggested structure: let Blue handle inclusion and morale, Gold handle timeline and roles, Green handle logic and quality, and Orange handle momentum and action.',
        }),
      ]),
      el('div', { className: 'lesson' }, [
        el('h3', { text: 'How the team should work' }),
        el('p', {
          text: 'Start with relationship safety, clarify the plan, test the logic, then assign action. That order usually reduces conflict and lets each style contribute well.',
        }),
        el('p', {
          text: 'When conflict happens, ask whether the disagreement is mainly about feelings, order, logic, or speed. That usually reveals the real issue faster.',
        }),
      ]),
    );
  });
}
