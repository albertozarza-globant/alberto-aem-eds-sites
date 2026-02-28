import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function optimizeLogos(list) {
  list.querySelectorAll('picture > img').forEach((image) => {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '500' }]);
    image.closest('picture')?.replaceWith(optimizedPicture);
  });
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'logo-cloud-list';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const item = document.createElement('li');
      item.className = 'logo-cloud-item';
      moveInstrumentation(cell, item);
      if (cell.childNodes.length) item.append(...cell.childNodes);
      if (item.childNodes.length) list.append(item);
    });
  });

  optimizeLogos(list);
  block.replaceChildren(list);
}
