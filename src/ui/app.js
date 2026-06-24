import { questionSets } from '../data/content.js';
import { formatCodeHelp } from '../lib/codes.js';
import { makeId } from '../lib/dom.js';
import { primarySecondary, sampleAnswers, validateAnswers, computeTotals, rankTotals } from '../lib/scoring.js';
import { renderBackgrounds } from './backgrounds.js';
import { renderResults } from './results.js';
import { createSavedPanel, loadSavedItem } from './saved.js';
import { createSurveyController } from './survey.js';
import { initTeacherTools } from './teacher.js';
import { initTabKeyboard } from './tabs.js';

function messages(root) {
  const warningBox = root.querySelector('#warningBox');
  const successBox = root.querySelector('#successBox');
  return {
    hide() {
      warningBox.classList.add('hidden');
      successBox.classList.add('hidden');
    },
    warn(msg) {
      warningBox.textContent = msg;
      warningBox.classList.remove('hidden');
      successBox.classList.add('hidden');
      warningBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    success(msg) {
      successBox.textContent = msg;
      successBox.classList.remove('hidden');
      warningBox.classList.add('hidden');
    },
  };
}

export function initApp() {
  const root = document.querySelector('.app');
  const msg = messages(root);
  let currentSetKey = 'classic';
  let latestResult = null;

  const studentName = root.querySelector('#studentName');
  const groupName = root.querySelector('#groupName');
  const questionSet = root.querySelector('#questionSet');
  const resultsPanel = root.querySelector('#resultsPanel');

  root.querySelector('#teacherCodeHelp').textContent = formatCodeHelp();

  const saved = createSavedPanel(root, {
    onOpen(item) {
      const loaded = loadSavedItem(item);
      currentSetKey = loaded.questionSet;
      questionSet.value = currentSetKey;
      studentName.value = loaded.studentName || '';
      groupName.value = loaded.groupName || '';
      latestResult = loaded;
      survey.setQuestions(questionSets[currentSetKey], loaded.answers.length ? loaded.answers : null);
      renderResults(latestResult, resultsPanel);
      msg.success('Saved profile opened.');
    },
    onMessage(text, type) {
      if (type === 'warn') msg.warn(text);
      else msg.success(text);
    },
  });

  const survey = createSurveyController({
    questionsEl: root.querySelector('#questions'),
    onWarn: (t) => msg.warn(t),
    onComplete: (partial) => {
      latestResult = {
        ...partial,
        studentName: studentName.value.trim(),
        groupName: groupName.value.trim(),
        savedAt: new Date().toISOString(),
        questionSet: currentSetKey,
      };
      msg.hide();
      renderResults(latestResult, resultsPanel);
    },
  });

  function loadQuestionSet(key, prefill = null) {
    currentSetKey = key;
    survey.setQuestions(questionSets[key], prefill);
    resultsPanel.classList.add('hidden');
    latestResult = null;
    msg.hide();
  }

  questionSet.addEventListener('change', () => {
    if (survey.hasProgress() && !confirm('Switch question sets? Current answers will be cleared.')) {
      questionSet.value = currentSetKey;
      return;
    }
    loadQuestionSet(questionSet.value);
  });

  root.querySelector('#startBtn').addEventListener('click', () => {
    if (survey.hasProgress() && !confirm('Start over? Current answers will be cleared.')) return;
    studentName.value = '';
    groupName.value = '';
    loadQuestionSet(currentSetKey);
  });

  root.querySelector('#sampleBtn').addEventListener('click', () => {
    studentName.value = 'Sample Student';
    const answers = sampleAnswers();
    loadQuestionSet(currentSetKey, answers);
    const error = validateAnswers(answers);
    if (!error) {
      const totals = computeTotals(answers);
      latestResult = {
        answers,
        totals,
        ranked: rankTotals(totals),
        studentName: studentName.value.trim(),
        groupName: groupName.value.trim(),
        savedAt: new Date().toISOString(),
        questionSet: currentSetKey,
      };
      msg.hide();
      renderResults(latestResult, resultsPanel);
    } else {
      msg.success('Sample loaded — rank each question or tap through to finish.');
    }
  });

  root.querySelector('#saveBtn').addEventListener('click', () => {
    msg.hide();
    if (!latestResult) {
      msg.warn('Complete and score the survey before saving.');
      return;
    }
    const ps = primarySecondary(latestResult.totals);
    saved.saveResult({
      id: makeId(),
      ...latestResult,
      primary: ps.primary,
      secondary: ps.secondary,
    });
    msg.success('Result saved in this browser.');
  });

  root.querySelector('#printBtn').addEventListener('click', () => window.print());

  root.querySelector('#themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    try {
      localStorage.setItem('colorSurveyTheme', next);
    } catch {
      /* ignore */
    }
  });

  try {
    const stored = localStorage.getItem('colorSurveyTheme');
    if (stored) document.documentElement.dataset.theme = stored;
  } catch {
    /* ignore */
  }

  initTabKeyboard(root);
  initTeacherTools(root, { onWarn: msg.warn, onClearMessages: msg.hide });
  renderBackgrounds(root);
  loadQuestionSet('classic');
  saved.render();

  window.addEventListener('error', (e) => {
    const out = root.querySelector('#teacherOutput');
    if (out) {
      out.replaceChildren();
      const div = document.createElement('div');
      div.className = 'warning';
      div.textContent = `JavaScript error: ${e.message}`;
      out.appendChild(div);
    }
  });
}
