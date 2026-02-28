import { moveInstrumentation } from '../../scripts/scripts.js';

function setActiveTab(block, panelId) {
  block.querySelectorAll('.tabs-tab').forEach((tab) => {
    const selected = tab.getAttribute('aria-controls') === panelId;
    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    tab.tabIndex = selected ? 0 : -1;
  });

  block.querySelectorAll('.tabs-panel').forEach((panel) => {
    const active = panel.id === panelId;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const tabsNav = document.createElement('div');
  tabsNav.className = 'tabs-nav';
  tabsNav.setAttribute('role', 'tablist');

  const tabsPanels = document.createElement('div');
  tabsPanels.className = 'tabs-panels';

  rows.forEach((row, index) => {
    const [labelCell, panelCell = labelCell] = [...row.children];
    const panelId = `tab-panel-${index + 1}`;
    const tabId = `tab-button-${index + 1}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tabs-tab';
    button.id = tabId;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panelId);
    button.setAttribute('aria-selected', 'false');
    button.tabIndex = -1;
    if (labelCell && labelCell.childNodes.length) button.append(...labelCell.childNodes);
    else button.textContent = `Tab ${index + 1}`;

    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.hidden = true;
    moveInstrumentation(row, panel);
    if (panelCell) panel.append(...panelCell.childNodes);

    button.addEventListener('click', () => setActiveTab(block, panelId));
    tabsNav.append(button);
    tabsPanels.append(panel);
  });

  tabsNav.addEventListener('keydown', (event) => {
    const tabs = [...tabsNav.querySelectorAll('.tabs-tab')];
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (event.code === 'ArrowRight' || event.code === 'ArrowDown') nextIndex = (currentIndex + 1) % tabs.length;
    if (event.code === 'ArrowLeft' || event.code === 'ArrowUp') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.code === 'Home') nextIndex = 0;
    if (event.code === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    setActiveTab(block, nextTab.getAttribute('aria-controls'));
  });

  block.replaceChildren(tabsNav, tabsPanels);

  const defaultIndex = block.classList.contains('start-second') && rows.length > 1 ? 1 : 0;
  const defaultPanelId = `tab-panel-${defaultIndex + 1}`;
  setActiveTab(block, defaultPanelId);
}
