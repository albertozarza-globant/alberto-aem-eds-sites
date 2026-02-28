import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function optimizeImage(card) {
  const image = card.querySelector('picture img');
  if (!image) return;
  const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
  card.querySelector('picture')?.replaceWith(optimizedPicture);
}

function decorateCard(card) {
  const body = card.querySelector('.testimonials-body');
  if (!body) return;

  if (!body.querySelector('blockquote')) {
    const firstParagraph = body.querySelector('p');
    if (firstParagraph) {
      const quote = document.createElement('blockquote');
      quote.append(...firstParagraph.childNodes);
      firstParagraph.replaceWith(quote);
    }
  }

  const bodyParagraphs = body.querySelectorAll('p');
  if (bodyParagraphs.length) bodyParagraphs[bodyParagraphs.length - 1].classList.add('testimonial-author');
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'testimonials-list';

  [...block.children].forEach((row) => {
    const card = document.createElement('li');
    card.className = 'testimonials-card';
    moveInstrumentation(row, card);

    while (row.firstElementChild) card.append(row.firstElementChild);
    [...card.children].forEach((column) => {
      if (column.children.length === 1 && column.querySelector('picture')) column.className = 'testimonials-media';
      else column.className = 'testimonials-body';
    });

    decorateCard(card);
    optimizeImage(card);
    list.append(card);
  });

  block.replaceChildren(list);
}
