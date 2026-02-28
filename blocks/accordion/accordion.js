import { moveInstrumentation } from '../../scripts/scripts.js';

function createAccordionItem(row, index, openFirst) {
  const details = document.createElement('details');
  details.className = 'accordion-item';
  if (openFirst && index === 0) details.open = true;
  moveInstrumentation(row, details);

  const [titleCell, contentCell = titleCell] = [...row.children];

  const summary = document.createElement('summary');
  summary.className = 'accordion-item-title';
  if (titleCell) summary.append(...titleCell.childNodes);

  const body = document.createElement('div');
  body.className = 'accordion-item-body';
  if (contentCell) body.append(...contentCell.childNodes);

  details.append(summary, body);
  return details;
}

export default function decorate(block) {
  const rows = [...block.children];
  const container = document.createElement('div');
  container.className = 'accordion-items';
  const openFirst = block.classList.contains('open-first');

  rows.forEach((row, index) => {
    container.append(createAccordionItem(row, index, openFirst));
  });

  block.replaceChildren(container);
}
