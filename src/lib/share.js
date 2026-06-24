import { profiles } from '../data/content.js';
import { primarySecondary } from './scoring.js';

const COLORS = new Set(['blue', 'gold', 'green', 'orange']);

export function buildSharePayload(result) {
  const { primary, secondary } = primarySecondary(result.totals);
  return {
    n: result.studentName || 'Student',
    p: primary,
    s: secondary,
    t: result.totals,
  };
}

export function encodeShare(payload) {
  const json = JSON.stringify(payload);
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(json)));
  const base = location.href.split('#')[0];
  return `${base}#share=${b64}`;
}

export function decodeShare() {
  const hash = location.hash || '';
  if (!hash.startsWith('#share=')) return null;
  try {
    const raw = hash.replace('#share=', '');
    const binary = atob(raw);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || !COLORS.has(parsed.p) || !COLORS.has(parsed.s)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function validateSharePayload(payload) {
  if (!payload || typeof payload !== 'object') return false;
  if (!COLORS.has(payload.p) || !COLORS.has(payload.s)) return false;
  if (!payload.t || typeof payload.t !== 'object') return false;
  for (const c of COLORS) {
    if (typeof payload.t[c] !== 'number') return false;
  }
  return true;
}

export function getProfile(key) {
  return profiles[key] ?? null;
}
