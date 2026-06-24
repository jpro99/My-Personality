import { describe, expect, it } from 'vitest';
import { buildCode, parseCode } from '../src/lib/codes.js';
import {
  analyzeProfile,
  computeTotals,
  primarySecondary,
  rankTotals,
  sampleAnswers,
  validateAnswers,
  validateManualTotals,
} from '../src/lib/scoring.js';

describe('validateAnswers', () => {
  it('accepts valid sample answers', () => {
    expect(validateAnswers(sampleAnswers())).toBeNull();
  });

  it('rejects incomplete answers', () => {
    const bad = [{ a: 4, b: 3, c: null, d: 1 }];
    expect(validateAnswers(bad)).toMatch(/incomplete/i);
  });

  it('rejects duplicate ranks', () => {
    const bad = [{ a: 4, b: 4, c: 3, d: 2 }];
    expect(validateAnswers(bad)).toMatch(/exactly once/i);
  });
});

describe('scoring totals', () => {
  it('sums to 100 for sample', () => {
    const totals = computeTotals(sampleAnswers());
    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    expect(sum).toBe(100);
  });

  it('matches known sample profile', () => {
    const totals = computeTotals(sampleAnswers());
    expect(totals.blue).toBe(38);
    expect(primarySecondary(totals).primary).toBe('blue');
  });
});

describe('rankTotals tie-break', () => {
  it('uses stable color order on ties', () => {
    const ranked = rankTotals({ blue: 25, gold: 25, green: 25, orange: 25 });
    expect(ranked[0][0]).toBe('blue');
    expect(ranked[1][0]).toBe('gold');
  });
});

describe('validateManualTotals', () => {
  it('requires sum of 100', () => {
    expect(validateManualTotals({ blue: 10, gold: 10, green: 10, orange: 10 })).toMatch(/100/);
  });

  it('accepts valid manual entry', () => {
    expect(validateManualTotals({ blue: 34, gold: 29, green: 18, orange: 19 })).toBeNull();
  });
});

describe('analyzeProfile ties', () => {
  it('detects tied primaries', () => {
    const totals = { blue: 22, gold: 29, green: 29, orange: 20 };
    const a = analyzeProfile(totals);
    expect(a.tiedPrimary).toBe(true);
    expect(a.primaries.sort()).toEqual(['gold', 'green']);
  });

  it('detects weakest colors', () => {
    const totals = { blue: 38, gold: 32, green: 17, orange: 13 };
    const a = analyzeProfile(totals);
    expect(a.weakest).toEqual(['orange']);
  });
});

describe('primarySecondary with ties', () => {
  it('returns both primaries in tied case', () => {
    const totals = { blue: 22, gold: 29, green: 29, orange: 20 };
    const ps = primarySecondary(totals);
    expect(ps.tied).toBe(true);
    expect(ps.primaries).toContain('gold');
    expect(ps.primaries).toContain('green');
  });
});

describe('codes', () => {
  it('round-trips new format', () => {
    const totals = { blue: 34, gold: 29, green: 18, orange: 19 };
    const code = buildCode(totals);
    expect(code).toBe('Bl34-Yl29-Gn18-Or19');
    expect(parseCode(code)).toEqual(totals);
  });

  it('parses legacy format', () => {
    expect(parseCode('B34-G29-R18-O19')).toEqual({
      blue: 34,
      gold: 29,
      green: 18,
      orange: 19,
    });
  });

  it('rejects garbage', () => {
    expect(parseCode('not-a-code')).toBeNull();
  });
});
