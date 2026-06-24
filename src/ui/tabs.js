export function activateTab(scope, name) {
  const root =
    scope instanceof HTMLElement && scope.id === 'resultsPanel'
      ? scope.closest('.app')
      : scope;
  const panel = root.querySelector('#resultsPanel') || root;
  panel.querySelectorAll('.tab').forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

export function initTabKeyboard(root) {
  const panel = root.querySelector('#resultsPanel');
  panel.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      const tabs = [...panel.querySelectorAll('.tab')];
      const i = tabs.indexOf(btn);
      if (e.key === 'ArrowRight') tabs[(i + 1) % tabs.length].focus();
      if (e.key === 'ArrowLeft') tabs[(i - 1 + tabs.length) % tabs.length].focus();
    });
  });
}
