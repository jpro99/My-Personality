/** Teacher codes: Bl=Blue, Yl=Gold (yellow), Gn=Green, Or=Orange. Legacy B-G-R-O still accepted. */

const NEW_CODE = /^Bl(\d+)-Yl(\d+)-Gn(\d+)-Or(\d+)$/i;
const LEGACY_CODE = /^B(\d+)-G(\d+)-R(\d+)-O(\d+)$/i;

export function buildCode(totals) {
  return `Bl${totals.blue}-Yl${totals.gold}-Gn${totals.green}-Or${totals.orange}`;
}

export function parseCode(code) {
  const cleaned = String(code).trim();
  let m = cleaned.match(NEW_CODE);
  if (m) {
    return {
      blue: Number(m[1]),
      gold: Number(m[2]),
      green: Number(m[3]),
      orange: Number(m[4]),
    };
  }
  m = cleaned.toUpperCase().match(LEGACY_CODE);
  if (m) {
    return {
      blue: Number(m[1]),
      gold: Number(m[2]),
      green: Number(m[3]),
      orange: Number(m[4]),
    };
  }
  return null;
}

export function formatCodeHelp() {
  return 'Format: Bl34-Yl29-Gn18-Or19 (Blue · Gold · Green · Orange). Legacy codes like B34-G29-R18-O19 still work.';
}

export function exampleCode() {
  return 'Bl34-Yl29-Gn18-Or19';
}
