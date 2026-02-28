import { moveInstrumentation } from '../../scripts/scripts.js';

function markValue(item) {
  const explicitValue = item.querySelector('h1, h2, h3, h4, h5, h6');
  if (explicitValue) {
    explicitValue.classList.add('stats-value');
    return;
  }

  const emphasized = item.querySelector('p > strong, p > b');
  if (emphasized) emphasized.closest('p')?.classList.add('stats-value');
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'stats-list';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const item = document.createElement('li');
      item.className = 'stats-item';
      moveInstrumentation(cell, item);
      if (cell.childNodes.length) item.append(...cell.childNodes);
      if (!item.childNodes.length) return;
      markValue(item);
      list.append(item);
    });
  });

  block.replaceChildren(list);
}
