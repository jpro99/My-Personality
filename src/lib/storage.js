const STORAGE_KEY = 'colorSurveySaved';

let memoryFallback = [];

export function getStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return memoryFallback.slice();
  }
}

export function setStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    memoryFallback = [];
  } catch {
    memoryFallback = data.slice();
  }
}

export function exportCsv(records) {
  const header = 'Name,Group,Primary,Secondary,Blue,Gold,Green,Orange,Code,Question Set,Saved At';
  const rows = records.map((r) =>
    [
      csvCell(r.studentName),
      csvCell(r.groupName),
      r.primary,
      r.secondary,
      r.totals.blue,
      r.totals.gold,
      r.totals.green,
      r.totals.orange,
      csvCell(r.code),
      r.questionSet,
      r.savedAt,
    ].join(','),
  );
  return [header, ...rows].join('\n');
}

function csvCell(value) {
  const s = String(value ?? '');
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function downloadCsv(records, filename = 'color-survey-results.csv') {
  const blob = new Blob([exportCsv(records)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
