import { LETTER_LABELS } from '../lib/constants.js';
import {
  computeTotals,
  isQuestionComplete,
  nextRankValue,
  rankTotals,
  validateAnswers,
} from '../lib/scoring.js';
import { el } from '../lib/dom.js';

export function createSurveyController({ questionsEl, onProgress, onComplete, onWarn }) {
  let questions = [];
  let answers = [];
  let currentIndex = 0;

  function setQuestions(list, prefill = null) {
    questions = list;
    answers = list.map((_, i) => {
      const base = { a: null, b: null, c: null, d: null };
      if (prefill?.[i]) Object.assign(base, prefill[i]);
      return base;
    });
    currentIndex = 0;
    render();
  }

  function completedCount() {
    return answers.filter(isQuestionComplete).length;
  }

  function render() {
    questionsEl.replaceChildren();
    if (!questions.length) return;

    const q = questions[currentIndex];
    const ranks = answers[currentIndex];

    const progress = el('div', { className: 'survey-progress' }, [
      el('div', { className: 'progress-meta' }, [
        el('span', {
          className: 'progress-label',
          text: `Question ${currentIndex + 1} of ${questions.length}`,
        }),
        el('span', {
          className: 'progress-count',
          text: `${completedCount()} of ${questions.length} complete`,
        }),
      ]),
      el('div', {
        className: 'progress-bar',
        role: 'progressbar',
        'aria-valuenow': String(completedCount()),
        'aria-valuemin': '0',
        'aria-valuemax': String(questions.length),
      }, [
        el('div', {
          className: 'progress-fill',
          style: `width:${(completedCount() / questions.length) * 100}%`,
        }),
      ]),
    ]);

    const hint = el('p', {
      className: 'rank-hint',
      text: 'Tap each statement in order: most like you first (4), then 3, 2, and least (1). Tap again to change.',
    });

    const card = el('section', { className: 'question-card' }, [
      el('h3', { className: 'question-prompt', text: q.prompt }),
      el('div', { className: 'option-grid', role: 'group', 'aria-label': q.prompt }),
    ]);

    const grid = card.querySelector('.option-grid');
    const nextRank = nextRankValue(ranks);

    for (const [key, text] of Object.entries(q.options)) {
      const meta = LETTER_LABELS[key];
      const rank = ranks[key];
      const btn = el('button', {
        type: 'button',
        className: `rank-option${rank ? ' ranked' : ''}${!rank && nextRank ? ' next-pick' : ''}`,
        'aria-pressed': rank ? 'true' : 'false',
        'data-letter': key,
      }, [
        el('span', { className: `option-letter tag ${meta.color}`, text: meta.letter }),
        el('span', { className: 'option-text', text }),
        el('span', {
          className: 'rank-badge',
          text: rank ? String(rank) : nextRank && !Object.values(ranks).some(Boolean) ? '?' : '',
        }),
      ]);

      btn.addEventListener('click', () => toggleRank(key));
      grid.appendChild(btn);
    }

    const nav = el('div', { className: 'survey-nav' }, [
      el('button', {
        type: 'button',
        className: 'btn btn-secondary',
        text: 'Previous',
        disabled: currentIndex === 0 ? '' : null,
        onClick: () => {
          currentIndex = Math.max(0, currentIndex - 1);
          render();
        },
      }),
      el('button', {
        type: 'button',
        className: 'btn btn-secondary',
        text: 'Clear question',
        onClick: () => {
          answers[currentIndex] = { a: null, b: null, c: null, d: null };
          render();
        },
      }),
      el('button', {
        type: 'button',
        className: 'btn btn-secondary',
        text: 'Next',
        disabled: currentIndex >= questions.length - 1 ? '' : null,
        onClick: () => {
          if (!isQuestionComplete(answers[currentIndex])) {
            onWarn?.(`Finish ranking all four options on question ${currentIndex + 1}.`);
            return;
          }
          currentIndex = Math.min(questions.length - 1, currentIndex + 1);
          render();
        },
      }),
    ]);

    const finishRow = el('div', { className: 'actions survey-finish' }, [
      el('button', {
        type: 'button',
        className: 'btn btn-primary',
        id: 'scoreBtn',
        text: completedCount() === questions.length ? 'See my results' : `Complete survey (${completedCount()}/${questions.length})`,
        onClick: submit,
      }),
    ]);

    questionsEl.append(progress, hint, card, nav, finishRow);
    onProgress?.(completedCount(), questions.length);
  }

  function toggleRank(letter) {
    const ranks = answers[currentIndex];
    if (ranks[letter] != null) {
      const removed = ranks[letter];
      ranks[letter] = null;
      for (const k of Object.keys(ranks)) {
        if (ranks[k] != null && ranks[k] < removed) ranks[k]++;
      }
    } else {
      const next = nextRankValue(ranks);
      if (next == null) return;
      ranks[letter] = next;
    }
    render();
    if (isQuestionComplete(ranks) && currentIndex < questions.length - 1) {
      setTimeout(() => {
        currentIndex++;
        render();
      }, 280);
    } else if (
      isQuestionComplete(ranks) &&
      currentIndex === questions.length - 1 &&
      answers.every(isQuestionComplete)
    ) {
      setTimeout(() => submit(), 350);
    }
  }

  function submit() {
    const error = validateAnswers(answers);
    if (error) {
      onWarn?.(error);
      return;
    }
    const totals = computeTotals(answers);
    onComplete?.({
      answers: answers.map((a) => ({ ...a })),
      totals,
      ranked: rankTotals(totals),
    });
  }

  function getAnswers() {
    return answers.map((a) => ({ ...a }));
  }

  function hasProgress() {
    return answers.some((a) => Object.values(a).some((v) => v != null));
  }

  return { setQuestions, render, getAnswers, hasProgress, completedCount };
}
