import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    li.classList.add(li.querySelector('.cards-card-image') ? 'cards-card-has-image' : 'cards-card-text-only');
    if (li.querySelector('h1, h2, h3, h4, h5, h6')) li.classList.add('cards-card-has-heading');
    if (li.querySelector('a.button')) li.classList.add('cards-card-has-button');
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  [...ul.children].forEach((card, index) => {
    card.classList.add(index % 2 === 0 ? 'cards-card-even' : 'cards-card-odd');
  });
  if ((block.classList.contains('featured') || block.classList.contains('highlight-first')) && ul.firstElementChild) {
    ul.firstElementChild.classList.add('cards-card-featured');
  }
  block.replaceChildren(ul);
}
