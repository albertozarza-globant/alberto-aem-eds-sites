import { moveInstrumentation } from '../../scripts/scripts.js';

function decoratePlan(plan) {
  const body = plan.querySelector('.pricing-plan-body');
  if (!body) return;

  const title = body.querySelector('h1, h2, h3, h4, h5, h6');
  if (title) title.classList.add('pricing-plan-title');

  const strongPrice = body.querySelector('p > strong, p > b');
  if (strongPrice) strongPrice.closest('p')?.classList.add('pricing-plan-price');

  const featureList = body.querySelector('ul, ol');
  if (featureList) featureList.classList.add('pricing-plan-features');

  const actions = body.querySelector('.button-container');
  if (actions) actions.classList.add('pricing-plan-actions');
}

function markFeaturedPlan(block, plans) {
  if (!plans.length) return;
  if (block.classList.contains('highlight-first')) plans[0].classList.add('pricing-plan-featured');
  if (block.classList.contains('highlight-middle')) plans[Math.floor(plans.length / 2)].classList.add('pricing-plan-featured');
  if (block.classList.contains('highlight-last')) plans[plans.length - 1].classList.add('pricing-plan-featured');
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'pricing-plans';

  [...block.children].forEach((row) => {
    const plan = document.createElement('li');
    plan.className = 'pricing-plan';
    moveInstrumentation(row, plan);

    while (row.firstElementChild) plan.append(row.firstElementChild);
    [...plan.children].forEach((column) => {
      if (column.children.length === 1 && column.querySelector('picture')) column.className = 'pricing-plan-media';
      else column.className = 'pricing-plan-body';
    });

    if (plan.querySelector('.button')) plan.classList.add('pricing-plan-has-action');
    decoratePlan(plan);
    list.append(plan);
  });

  const plans = [...list.children];
  markFeaturedPlan(block, plans);
  block.replaceChildren(list);
}
