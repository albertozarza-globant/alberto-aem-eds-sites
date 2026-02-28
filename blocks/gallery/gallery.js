import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createGalleryItem(cell) {
  const figure = document.createElement('figure');
  figure.className = 'gallery-item';
  moveInstrumentation(cell, figure);

  const picture = cell.querySelector('picture');
  if (!picture) return null;

  const image = picture.querySelector('img');
  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '1200' }]);
    picture.replaceWith(optimizedPicture);
  }

  const optimized = cell.querySelector('picture');
  if (optimized) figure.append(optimized);

  const caption = document.createElement('figcaption');
  [...cell.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
    caption.append(node);
  });

  if (caption.childNodes.length) {
    caption.className = 'gallery-caption';
    figure.append(caption);
  }

  return figure;
}

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const item = createGalleryItem(cell);
      if (item) grid.append(item);
    });
  });

  block.replaceChildren(grid);
}
