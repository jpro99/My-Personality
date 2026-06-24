import { profiles } from '../data/content.js';
import { buildCode } from '../lib/codes.js';
import { buildSharePayload, encodeShare } from '../lib/share.js';
import {
  analyzeProfile,
  formatColorList,
  primarySecondary,
} from '../lib/scoring.js';
import { el } from '../lib/dom.js';
import {
  renderActiveTab,
  renderColorPills,
  renderFacilitatorTab,
} from './color-explorer.js';
import { renderQr } from './qr.js';
import { activateTab } from './tabs.js';

let exploreState = {
  selectedColor: null,
  activeTab: 'studentcard',
  analysis: null,
  result: null,
};

function refreshTabContent(root) {
  const { selectedColor, activeTab, analysis, result } = exploreState;
  if (!selectedColor || !analysis) return;

  const mount = root.querySelector('#tabContentMount');
  if (activeTab === 'facilitator') {
    renderFacilitatorTab(selectedColor, mount);
  } else {
    renderActiveTab(activeTab, selectedColor, analysis, result.studentName, mount);
  }
}

function selectColor(root, colorKey) {
  exploreState.selectedColor = colorKey;
  const pills = root.querySelector('#colorPills');
  renderColorPills(pills, exploreState.analysis, colorKey, (key) => selectColor(root, key));

  root.querySelectorAll('.score-card-btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.color === colorKey);
    btn.setAttribute('aria-pressed', btn.dataset.color === colorKey ? 'true' : 'false');
  });

  refreshTabContent(root);
}

export function renderResults(result, root) {
  const { totals, ranked } = result;
  const analysis = analyzeProfile(totals);
  const ps = primarySecondary(totals);

  exploreState = {
    selectedColor: exploreState.selectedColor && analysis.scoreByColor[exploreState.selectedColor] != null
      ? exploreState.selectedColor
      : analysis.primaries[0],
    activeTab: exploreState.activeTab || 'studentcard',
    analysis,
    result,
  };

  const scoreCards = root.querySelector('#scoreCards');
  scoreCards.replaceChildren();
  for (const [key, value] of ranked) {
    const p = profiles[key];
    const isTop = analysis.primaries.includes(key);
    const isTied = isTop && analysis.tiedPrimary;

    const card = el('button', {
      type: 'button',
      className: `score-card score-card-btn ${p.className}${exploreState.selectedColor === key ? ' selected' : ''}`,
      'data-color': key,
      'aria-pressed': exploreState.selectedColor === key ? 'true' : 'false',
      'aria-label': `${p.label}, ${value} points. Click to explore what ${p.label} means.`,
      onClick: () => selectColor(root, key),
    }, [
      el('h3', { text: p.label }),
      el('p', { className: 'score-value', text: String(value) }),
      isTied ? el('span', { className: 'score-tie-badge', text: 'Tied for top' }) : null,
      isTop && !isTied ? el('span', { className: 'score-rank-badge', text: 'Your top' }) : null,
      analysis.secondaries.includes(key) && !isTop
        ? el('span', { className: 'score-rank-badge secondary', text: '2nd' })
        : null,
      analysis.weakest.includes(key)
        ? el('span', { className: 'score-grow-badge', text: 'Grow here' })
        : null,
      el('p', { className: 'score-card-hint', text: 'Tap to explore →' }),
    ]);
    scoreCards.appendChild(card);
  }

  const primaryLabels = formatColorList(analysis.primaries, profiles);
  const secondaryLabels = formatColorList(analysis.secondaries, profiles);

  root.querySelector('#primaryTitle').textContent = analysis.tiedPrimary
    ? `Primary (tied): ${primaryLabels}`
    : `Primary: ${primaryLabels}`;
  root.querySelector('#primarySummary').textContent = analysis.tiedPrimary
    ? `You scored equally on ${primaryLabels}. Both describe you — explore each using the score cards or color pills.`
    : profiles[ps.primary].background;
  root.querySelector('#primaryTraits').textContent = analysis.tiedPrimary
    ? analysis.primaries.map((c) => profiles[c].traits).join(' ')
    : profiles[ps.primary].traits;

  root.querySelector('#secondaryTitle').textContent = analysis.tiedSecondary
    ? `Secondary (tied): ${secondaryLabels}`
    : `Secondary: ${secondaryLabels}`;
  root.querySelector('#secondarySummary').textContent = analysis.secondaries.length
    ? analysis.tiedSecondary
      ? `You also tied for second on ${secondaryLabels}.`
      : profiles[ps.secondary].background
    : '—';
  root.querySelector('#secondaryTraits').textContent = analysis.secondaries.length
    ? analysis.secondaries.map((c) => profiles[c].traits).join(' ')
    : '';

  if (analysis.weakest.length) {
    const weakLabels = formatColorList(analysis.weakest, profiles);
    root.querySelector('#weakColorNote').textContent = `Growth edge: ${weakLabels} (${analysis.minScore} pts) — building these skills helps relationships and teams. See Growth tab.`;
    root.querySelector('#weakColorNote').classList.remove('hidden');
  } else {
    root.querySelector('#weakColorNote').classList.add('hidden');
  }

  renderColorPills(root.querySelector('#colorPills'), analysis, exploreState.selectedColor, (key) =>
    selectColor(root, key),
  );

  root.querySelectorAll('#resultTabs .tab').forEach((tab) => {
    tab.onclick = () => {
      exploreState.activeTab = tab.dataset.tab;
      activateTab(root, tab.dataset.tab);
      refreshTabContent(root);
    };
  });

  refreshTabContent(root);

  const code = buildCode(totals);
  root.querySelector('#teacherCode').textContent = code;

  const payload = buildSharePayload(result);
  const shareUrl = encodeShare(payload);
  root.querySelector('#qrSummary').textContent = `${payload.n} can share this QR so others see communication guidance instantly.`;
  renderQr(root.querySelector('#qrBox'), shareUrl);

  const copyBtn = root.querySelector('#copyCodeBtn');
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy code'; }, 2000);
    } catch {
      copyBtn.textContent = 'Copy failed';
    }
  };

  const copyLinkBtn = root.querySelector('#copyLinkBtn');
  copyLinkBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      copyLinkBtn.textContent = 'Link copied!';
      setTimeout(() => { copyLinkBtn.textContent = 'Copy share link'; }, 2000);
    } catch {
      copyLinkBtn.textContent = 'Copy failed';
    }
  };

  root.classList.remove('hidden');
  activateTab(root, exploreState.activeTab);
  root.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export { questionSets } from '../data/content.js';
