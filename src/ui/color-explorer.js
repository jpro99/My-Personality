import { profiles, studentLayers, compatibility, meetingLessons } from '../data/content.js';
import { colorDepth, teamDynamics } from '../data/color-depth.js';
import { COLOR_ORDER } from '../lib/constants.js';
import { getColorRelation } from '../lib/scoring.js';
import { escapeHtml, el, ul } from '../lib/dom.js';

function relationBanner(relation, colorKey, analysis, studentName) {
  const label = profiles[colorKey].label;
  const score = analysis.scoreByColor[colorKey];
  const name = studentName || 'You';

  const messages = {
    primary: `${name}, this is your strongest color (${score} points). Much of this page describes you.`,
    'co-primary': `${name}, you are tied for strongest with ${analysis.primaries.length} colors (${score} points each). This color is equally “you.”`,
    secondary: `This is your secondary color (${score} points) — a strong second style that shapes how you show up.`,
    'co-secondary': `You tied for second place on ${analysis.secondaries.length} colors (${score} points). This is equally your backup style.`,
    weak: `This is one of your lowest scores (${score} points). It is a growth edge — building ${label} skills will help teams and relationships.`,
    'co-weak': `This is among your lowest scores (${score} points). Stretching here strengthens balance.`,
    moderate: `You scored ${score} on ${label} — not your top or bottom, but still part of your full picture. Tap every color to learn what each means.`,
  };

  const cls =
    relation === 'primary' || relation === 'co-primary'
      ? 'banner-primary'
      : relation === 'weak' || relation === 'co-weak'
        ? 'banner-weak'
        : 'banner-neutral';

  return el('div', { className: `color-context-banner ${cls}`, role: 'note' }, [
    el('p', { text: messages[relation] ?? messages.moderate }),
  ]);
}

function sectionTitle(text) {
  return el('h3', { className: 'explorer-section-title', text });
}

export function renderColorPills(container, analysis, selectedColor, onSelect) {
  container.replaceChildren();
  const wrap = el('div', { className: 'color-pills', role: 'tablist', 'aria-label': 'Choose a color to explore' });

  for (const key of COLOR_ORDER) {
    const p = profiles[key];
    const score = analysis.scoreByColor[key];
    const relation = getColorRelation(analysis, key);
    const badges = [];
    if (relation === 'primary' || relation === 'co-primary') badges.push('Top');
    else if (relation === 'secondary' || relation === 'co-secondary') badges.push('2nd');
    else if (relation === 'weak' || relation === 'co-weak') badges.push('Grow');

    const btn = el('button', {
      type: 'button',
      className: `color-pill ${p.className}${selectedColor === key ? ' active' : ''}${relation.includes('primary') ? ' is-top' : ''}${relation.includes('weak') ? ' is-weak' : ''}`,
      role: 'tab',
      'aria-selected': selectedColor === key ? 'true' : 'false',
      'aria-label': `${p.label}, ${score} points`,
      onClick: () => onSelect(key),
    }, [
      el('span', { className: 'pill-label', text: p.label }),
      el('span', { className: 'pill-score', text: String(score) }),
      ...badges.map((b) => el('span', { className: 'pill-badge', text: b })),
    ]);
    wrap.appendChild(btn);
  }

  container.appendChild(wrap);
  container.appendChild(
    el('p', {
      className: 'small muted pills-hint',
      text: 'Tap any color above or a score card to learn what it means — teamwork, marriage, growth, and more.',
    }),
  );
}

export function renderOverview(colorKey, analysis, studentName, container) {
  const p = profiles[colorKey];
  const depth = colorDepth[colorKey];
  const layer = studentLayers[colorKey];
  const relation = getColorRelation(analysis, colorKey);

  container.replaceChildren(
    relationBanner(relation, colorKey, analysis, studentName),
    el('div', { className: 'lesson' }, [
      sectionTitle(`What ${p.label} means`),
      el('p', { text: depth.meaning }),
      el('p', { text: p.background }),
      el('p', { className: 'small', text: p.traits }),
    ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [
        sectionTitle('This is who I am (student voice)'),
        ul(layer.identity),
      ]),
      el('div', { className: 'lesson' }, [
        sectionTitle('How I talk'),
        ul(layer.talk),
        el('p', { className: 'small', text: p.speakTo }),
      ]),
    ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [
        sectionTitle('Questions I naturally ask'),
        ul(layer.questions),
        el('p', { className: 'small', text: layer.why }),
      ]),
      el('div', { className: 'lesson' }, [
        sectionTitle('What makes them tick'),
        ul(p.ticks),
      ]),
    ]),
  );
}

export function renderCommunication(colorKey, analysis, studentName, container) {
  const p = profiles[colorKey];
  const relation = getColorRelation(analysis, colorKey);

  container.replaceChildren(
    relationBanner(relation, colorKey, analysis, studentName),
    el('div', { className: 'grid-2' }, [
      el('div', { className: 'lesson' }, [
        sectionTitle(`How ${p.label}s communicate`),
        el('p', { text: p.speakLike }),
        el('p', { html: `<strong>Best way to talk to ${escapeHtml(p.label)}s:</strong> ${escapeHtml(p.speakTo)}` }),
      ]),
      el('div', { className: 'lesson' }, [
        sectionTitle('Facilitator notes'),
        el('p', { html: `<strong>Teaching point:</strong> ${escapeHtml(p.teach)}` }),
        el('p', { html: `<strong>Watch-out:</strong> ${escapeHtml(p.watch)}` }),
        el('p', { html: `<strong>Coaching move:</strong> ${escapeHtml(p.coach)}` }),
      ]),
    ]),
    el('div', { className: 'lesson section-gap' }, [
      sectionTitle('What people misunderstand'),
      ul(studentLayers[colorKey].misread),
    ]),
  );
}

export function renderTeamwork(colorKey, analysis, studentName, container) {
  const p = profiles[colorKey];
  const depth = colorDepth[colorKey].teamwork;
  const relation = getColorRelation(analysis, colorKey);
  const isYou = relation.includes('primary') || relation.includes('secondary');

  const frustrationBlock = el('div', { className: 'lesson section-gap' }, [
    sectionTitle(`When ${p.label} works with other colors on a team`),
    el('p', {
      className: 'small muted',
      text: 'Why friction happens — and how each pairing can work better.',
    }),
  ]);

  for (const other of COLOR_ORDER.filter((c) => c !== colorKey)) {
    const otherLabel = profiles[other].label;
    frustrationBlock.appendChild(
      el('div', { className: 'scenario-card' }, [
        el('h4', { html: `<span class="tag ${p.className}">${escapeHtml(p.label)}</span> + <span class="tag ${profiles[other].className}">${escapeHtml(otherLabel)}</span>` }),
        el('p', { text: depth.frustrations[other] }),
        el('p', { className: 'small', text: teamDynamics[colorKey][other] }),
      ]),
    );
  }

  container.replaceChildren(
    relationBanner(relation, colorKey, analysis, studentName),
    isYou
      ? el('div', { className: 'lesson highlight-you' }, [
          sectionTitle('This is you on a team'),
          el('p', { text: depth.whenYouAreThis }),
        ])
      : el('div', { className: 'lesson' }, [
          sectionTitle(`If someone on your team is ${p.label}`),
          el('p', { text: depth.intro }),
        ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [
        sectionTitle('Strengths on a team'),
        ul(depth.strengths),
        el('p', { html: `<strong>Best role:</strong> ${escapeHtml(depth.bestRole)}` }),
      ]),
      el('div', { className: 'lesson' }, [
        sectionTitle('Limits to watch'),
        ul(depth.limits),
        el('p', { text: p.team[2] }),
      ]),
    ]),
    el('div', { className: 'lesson section-gap' }, [
      sectionTitle('Team scenarios'),
      ul(depth.scenarios),
    ]),
    el('div', { className: 'lesson section-gap' }, [
      sectionTitle('Meeting and classroom value'),
      ...meetingLessons[colorKey].map((x) => el('p', { text: x })),
    ]),
    frustrationBlock,
  );
}

export function renderRelationships(colorKey, analysis, studentName, container) {
  const p = profiles[colorKey];
  const rel = colorDepth[colorKey].relationships;
  const relation = getColorRelation(analysis, colorKey);

  const spouseCards = el('div', { className: 'grid-2 section-gap' }, []);
  for (const other of COLOR_ORDER.filter((c) => c !== colorKey)) {
    spouseCards.appendChild(
      el('div', { className: 'scenario-card' }, [
        el('h4', {
          html: `${escapeHtml(p.label)} married to ${escapeHtml(profiles[other].label)}`,
        }),
        el('p', { text: rel.withSpouse[other] }),
        el('p', { className: 'small', text: compatibility[colorKey].find((x) => x.includes(profiles[other].label)) ?? '' }),
      ]),
    );
  }

  container.replaceChildren(
    relationBanner(relation, colorKey, analysis, studentName),
    el('div', { className: 'lesson' }, [
      sectionTitle('Marriage and close partnership'),
      el('p', { text: rel.marriageIntro }),
    ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [sectionTitle('What they need'), ul(rel.needs)]),
      el('div', { className: 'lesson' }, [sectionTitle('What they give'), ul(rel.gives)]),
    ]),
    el('div', { className: 'lesson section-gap' }, [
      sectionTitle('Conflict patterns under stress'),
      ul(rel.conflictPatterns),
      ...p.partner.map((x) => el('p', { text: x })),
    ]),
    el('div', { className: 'section-gap' }, [
      sectionTitle('Spouse scenarios by color pairing'),
      spouseCards,
    ]),
    el('div', { className: 'lesson section-gap' }, [
      sectionTitle('Outside your comfort zone'),
      el('p', {
        text: 'Strong relationships require speaking the other person’s color language — not only your own. If your partner is a different color, study their section using the color pills above.',
      }),
    ]),
  );
}

export function renderGrowth(colorKey, analysis, studentName, container) {
  const p = profiles[colorKey];
  const growth = colorDepth[colorKey].growth;
  const relation = getColorRelation(analysis, colorKey);
  const isWeak = relation.includes('weak');

  container.replaceChildren(
    relationBanner(relation, colorKey, analysis, studentName),
    isWeak
      ? el('div', { className: 'lesson highlight-grow' }, [
          sectionTitle('Priority growth area for you'),
          el('p', { text: growth.whenWeak }),
        ])
      : el('div', { className: 'lesson' }, [
          sectionTitle(`Growing ${p.label} energy`),
          el('p', { text: growth.whenStrong }),
        ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [
        sectionTitle('Stretch practices'),
        ul(growth.stretchPractice),
        el('p', { className: 'small', text: `Comfort zone trap: ${growth.comfortZone}` }),
      ]),
      el('div', { className: 'lesson' }, [
        sectionTitle('Stretch into every color'),
        ...COLOR_ORDER.map((c) =>
          el('p', {
            html: `<strong>${escapeHtml(profiles[c].label)}:</strong> ${escapeHtml(p.stretch[c] || 'No note.')}`,
          }),
        ),
      ]),
    ]),
    el('div', { className: 'lesson section-gap' }, [
      sectionTitle('General growth moves'),
      ul(p.growth),
    ]),
    renderAllColorsGrowthSummary(analysis, studentName),
  );
}

function renderAllColorsGrowthSummary(analysis, studentName) {
  const name = studentName || 'You';
  const wrap = el('div', { className: 'lesson all-colors-growth section-gap' }, [
    sectionTitle('Your full growth map (all four colors)'),
    el('p', {
      className: 'small muted',
      text: `${name}, balance means building skills in colors that are not natural — especially your lowest scores.`,
    }),
  ]);

  for (const [key, score] of analysis.ranked) {
    const relation = getColorRelation(analysis, key);
    const g = colorDepth[key].growth;
    const blurb = relation.includes('weak') ? g.whenWeak : g.whenStrong;
    wrap.appendChild(
      el('div', { className: `growth-row tag-row-${key}` }, [
        el('h4', {
          html: `<span class="tag ${profiles[key].className}">${escapeHtml(profiles[key].label)}</span> — ${score} points${relation.includes('weak') ? ' · stretch here' : relation.includes('primary') ? ' · core strength' : ''}`,
        }),
        el('p', { text: blurb }),
      ]),
    );
  }
  return wrap;
}

export function renderDeepDive(colorKey, analysis, studentName, container) {
  const layer = studentLayers[colorKey];
  const dive = colorDepth[colorKey].deepDive;
  const relation = getColorRelation(analysis, colorKey);

  container.replaceChildren(
    relationBanner(relation, colorKey, analysis, studentName),
    el('div', { className: 'grid-2' }, [
      el('div', { className: 'lesson' }, [sectionTitle('Basic explanation'), ul(layer.basic)]),
      el('div', { className: 'lesson' }, [sectionTitle('More information'), ul(layer.more)]),
    ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [sectionTitle('Why I say what I say'), ul(layer.motive)]),
      el('div', { className: 'lesson' }, [sectionTitle('Under stress'), el('p', { text: dive.underStress })]),
    ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [
        sectionTitle('Core motivation'),
        el('p', { text: dive.coreMotivation }),
        el('p', { html: `<strong>Workplace:</strong> ${escapeHtml(dive.workplace)}` }),
      ]),
      el('div', { className: 'lesson' }, [
        sectionTitle('Parenting note'),
        el('p', { text: dive.parenting }),
        el('p', { html: `<strong>Often misread as:</strong> ${escapeHtml(dive.misread)}` }),
      ]),
    ]),
    renderAllColorsDeepIndex(analysis),
  );
}

function renderAllColorsDeepIndex(_analysis) {
  const wrap = el('div', { className: 'lesson all-colors-index section-gap' }, [
    sectionTitle('Explore every color (deep dive index)'),
    el('p', {
      className: 'small muted',
      text: 'Use the color pills to switch. Everyone benefits from understanding all four — not only their top score.',
    }),
  ]);

  for (const key of COLOR_ORDER) {
    const d = colorDepth[key].deepDive;
    wrap.appendChild(
      el('div', { className: 'depth-index-row' }, [
        el('h4', { html: `<span class="tag ${profiles[key].className}">${escapeHtml(profiles[key].label)}</span>` }),
        el('p', { text: `${colorDepth[key].meaning} ${d.coreMotivation}` }),
      ]),
    );
  }
  return wrap;
}

export function renderMyCard(colorKey, analysis, studentName, container) {
  const primaries = analysis.primaries;
  const layer = studentLayers[colorKey];
  const p = profiles[colorKey];

  const tieNote =
    analysis.tiedPrimary && primaries.length > 1
      ? el('div', { className: 'lesson highlight-you section-gap' }, [
          sectionTitle('You have a tie at the top'),
          el('p', {
            text: `Your scores tie for first place. You are equally ${primaries.map((c) => profiles[c].label).join(' and ')}. Read each tied color using the pills or score cards — all of them describe you.`,
          }),
        ])
      : null;

  container.replaceChildren(
    el('div', { className: 'lesson' }, [
      sectionTitle(`${studentName || 'Your'} personal card`),
      el('p', {
        text: analysis.tiedPrimary
          ? `Strongest colors: ${primaries.map((c) => profiles[c].label).join(' & ')} (tied).`
          : `Strongest color: ${profiles[analysis.primaries[0]].label}.`,
      }),
    ]),
    tieNote,
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [sectionTitle('This is who I am'), ul(layer.identity)]),
      el('div', { className: 'lesson' }, [
        sectionTitle('Questions I naturally ask'),
        ul(layer.questions),
        el('p', { className: 'small', text: layer.why }),
      ]),
    ]),
    el('div', { className: 'grid-2 section-gap' }, [
      el('div', { className: 'lesson' }, [sectionTitle('How I talk'), ul(layer.talk)]),
      el('div', { className: 'lesson' }, [
        sectionTitle('Swap QR with a partner'),
        ul(layer.swap),
        el('p', { className: 'small', text: p.speakLike }),
      ]),
    ]),
    el('p', {
      className: 'small muted',
      text: 'Tap other colors above to learn what teammates and partners might need from you — and what you can learn from them.',
    }),
  );
}

const TAB_RENDERERS = {
  studentcard: renderMyCard,
  communication: renderCommunication,
  teamwork: renderTeamwork,
  relationships: renderRelationships,
  growth: renderGrowth,
  deepdive: renderDeepDive,
  explore: renderOverview,
};

export function renderActiveTab(tabName, colorKey, analysis, studentName, container) {
  const fn = TAB_RENDERERS[tabName] ?? renderOverview;
  fn(colorKey, analysis, studentName, container);
}

export function renderFacilitatorTab(colorKey, container) {
  const p = profiles[colorKey];
  container.replaceChildren(
    el('div', { className: 'grid-3' }, [
      el('div', { className: 'kpi' }, [el('h4', { text: 'Teaching point' }), el('p', { text: p.teach })]),
      el('div', { className: 'kpi' }, [el('h4', { text: 'Watch-out' }), el('p', { text: p.watch })]),
      el('div', { className: 'kpi' }, [el('h4', { text: 'Coaching move' }), el('p', { text: p.coach })]),
    ]),
    el('p', {
      className: 'small muted section-gap',
      text: 'Switch colors with the pills above to coach each style on your team or in your class.',
    }),
  );
}
