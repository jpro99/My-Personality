import { LETTER_TO_COLOR, SCORE_VALUES, TIE_BREAK_ORDER } from './constants.js';

export function validateAnswers(answers) {
  for (let i = 0; i < answers.length; i++) {
    const vals = Object.values(answers[i]);
    if (vals.some((v) => v === null || v === undefined)) {
      return `Question ${i + 1} is incomplete. Rank all four options.`;
    }
    if ([...vals].sort((a, b) => a - b).join(',') !== '1,2,3,4') {
      return `Question ${i + 1} must use each rank exactly once: 4, 3, 2, and 1.`;
    }
  }
  return null;
}

export function computeTotals(answers) {
  const totals = { blue: 0, gold: 0, green: 0, orange: 0 };
  for (const set of answers) {
    for (const [letter, score] of Object.entries(set)) {
      totals[LETTER_TO_COLOR[letter]] += score;
    }
  }
  return totals;
}

export function rankTotals(totals) {
  return Object.entries(totals).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return TIE_BREAK_ORDER.indexOf(a[0]) - TIE_BREAK_ORDER.indexOf(b[0]);
  });
}

export function primarySecondary(totals) {
  const analysis = analyzeProfile(totals);
  return {
    ranked: analysis.ranked,
    primary: analysis.primaries[0],
    secondary: analysis.secondaries[0] ?? analysis.ranked[1]?.[0],
    tied: analysis.tiedPrimary,
    primaries: analysis.primaries,
    secondaries: analysis.secondaries,
  };
}

/** Full profile analysis with ties and weak spots */
export function analyzeProfile(totals) {
  const ranked = rankTotals(totals);
  const maxScore = ranked[0][1];
  const minScore = ranked[ranked.length - 1][1];
  const primaries = ranked.filter(([, s]) => s === maxScore).map(([c]) => c);
  const secondScore = ranked.find(([, s]) => s < maxScore)?.[1];
  const secondaries =
    secondScore != null ? ranked.filter(([, s]) => s === secondScore).map(([c]) => c) : [];
  const weakest = ranked.filter(([, s]) => s === minScore).map(([c]) => c);

  return {
    ranked,
    primaries,
    secondaries,
    weakest,
    maxScore,
    minScore,
    tiedPrimary: primaries.length > 1,
    tiedSecondary: secondaries.length > 1,
    scoreByColor: Object.fromEntries(ranked),
  };
}

export function getColorRelation(analysis, colorKey) {
  if (analysis.primaries.includes(colorKey)) {
    return analysis.primaries.length > 1 ? 'co-primary' : 'primary';
  }
  if (analysis.secondaries.includes(colorKey)) {
    return analysis.secondaries.length > 1 ? 'co-secondary' : 'secondary';
  }
  if (analysis.weakest.includes(colorKey)) {
    return analysis.weakest.length > 1 ? 'co-weak' : 'weak';
  }
  return 'moderate';
}

export function formatColorList(colors, profiles) {
  return colors.map((c) => profiles[c].label).join(' & ');
}


export function validateManualTotals(totals) {
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (sum !== 100) {
    return `Scores must add up to 100 (currently ${sum}). Each survey produces totals of 100.`;
  }
  for (const value of Object.values(totals)) {
    if (value < 10 || value > 40) {
      return 'Each color score should be between 10 and 40 for a valid survey.';
    }
  }
  return null;
}

export function isQuestionComplete(ranks) {
  const values = Object.values(ranks);
  return values.length === 4 && values.every((v) => v != null);
}

export function nextRankValue(ranks) {
  const used = new Set(Object.values(ranks).filter((v) => v != null));
  for (const v of SCORE_VALUES) {
    if (!used.has(v)) return v;
  }
  return null;
}

export function sampleAnswers() {
  return [
    { a: 2, b: 1, c: 4, d: 3 },
    { a: 1, b: 2, c: 4, d: 3 },
    { a: 2, b: 1, c: 4, d: 3 },
    { a: 1, b: 2, c: 3, d: 4 },
    { a: 1, b: 2, c: 4, d: 3 },
    { a: 1, b: 2, c: 3, d: 4 },
    { a: 1, b: 2, c: 4, d: 3 },
    { a: 1, b: 2, c: 4, d: 3 },
    { a: 1, b: 2, c: 4, d: 3 },
    { a: 2, b: 1, c: 4, d: 3 },
  ];
}
