document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.getAttribute('data-copy');
    const hint = button.querySelector('[data-copy-hint]');
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (hint) {
        const original = hint.textContent;
        hint.textContent = document.documentElement.lang === 'en' ? 'Copied' : '已复制';
        window.setTimeout(() => {
          hint.textContent = original;
        }, 1500);
      }
    } catch {
      if (hint) {
        hint.textContent = document.documentElement.lang === 'en' ? 'Copy failed' : '复制失败';
      }
    }
  });
});

document.querySelectorAll('[data-tabs]').forEach((root) => {
  const tabs = root.querySelectorAll('[role="tab"]');
  const panels = root.querySelectorAll('[data-panel]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
      });
    });
  });
});
