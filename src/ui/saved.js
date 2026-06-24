import { profiles } from '../data/content.js';
import { buildCode } from '../lib/codes.js';
import { escapeHtml, el } from '../lib/dom.js';
import { downloadCsv, getStorage, setStorage } from '../lib/storage.js';
import { rankTotals } from '../lib/scoring.js';

export function createSavedPanel(root, { onOpen, onMessage }) {
  const list = root.querySelector('#savedList');

  function render() {
    const data = getStorage();
    list.replaceChildren();
    if (!data.length) {
      list.appendChild(el('div', { className: 'profile-box' }, [el('p', { text: 'No saved students yet.' })]));
      return;
    }

    for (const item of data) {
      const row = el('div', { className: 'save-item' }, [
        el('div', {}, [
          el('h3', { className: 'save-name', text: item.studentName }),
          el('p', {
            className: 'small',
            text: `${item.groupName ? `${item.groupName} · ` : ''}${new Date(item.savedAt).toLocaleString()} · ${item.questionSet}`,
          }),
          el('p', {
            html: `<span class="tag ${item.primary}">${escapeHtml(profiles[item.primary].label)}</span><span class="tag ${item.secondary}">${escapeHtml(profiles[item.secondary].label)}</span>`,
          }),
          el('p', { className: 'small', text: item.code }),
        ]),
        el('div', { className: 'actions' }, [
          el('button', {
            type: 'button',
            className: 'btn btn-secondary',
            text: 'Open',
            onClick: () => onOpen(item),
          }),
          el('button', {
            type: 'button',
            className: 'btn btn-secondary',
            text: 'Delete',
            onClick: () => {
              setStorage(getStorage().filter((x) => x.id !== item.id));
              render();
              onMessage?.('Saved result removed.');
            },
          }),
        ]),
      ]);
      list.appendChild(row);
    }
  }

  root.querySelector('#exportCsvBtn')?.addEventListener('click', () => {
    const data = getStorage();
    if (!data.length) {
      onMessage?.('Nothing to export yet.', 'warn');
      return;
    }
    downloadCsv(data);
    onMessage?.('CSV downloaded.');
  });

  return { render, saveResult(latestResult) {
    const data = getStorage();
    data.unshift({
      id: latestResult.id,
      studentName: latestResult.studentName || 'Unnamed student',
      groupName: latestResult.groupName || '',
      primary: latestResult.primary,
      secondary: latestResult.secondary,
      totals: latestResult.totals,
      savedAt: latestResult.savedAt,
      questionSet: latestResult.questionSet,
      code: buildCode(latestResult.totals),
      answers: latestResult.answers,
    });
    setStorage(data);
    render();
  } };
}

export function loadSavedItem(item) {
  return {
    studentName: item.studentName,
    groupName: item.groupName,
    totals: item.totals,
    ranked: rankTotals(item.totals),
    answers: item.answers || [],
    savedAt: item.savedAt,
    questionSet: item.questionSet || 'classic',
  };
}
