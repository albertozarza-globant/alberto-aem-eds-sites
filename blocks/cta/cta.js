import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const inner = document.createElement('div');
  inner.className = 'cta-inner';

  const content = document.createElement('div');
  content.className = 'cta-content';

  const media = document.createElement('div');
  media.className = 'cta-media';

  rows.forEach((row) => {
    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture');
      if (picture && cell.children.length === 1 && !media.childNodes.length) {
        moveInstrumentation(cell, media);
        media.append(...cell.childNodes);
      } else {
        moveInstrumentation(cell, content);
        if (cell.childNodes.length) content.append(...cell.childNodes);
      }
    });
  });

  const image = media.querySelector('picture img');
  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '1200' }]);
    media.querySelector('picture')?.replaceWith(optimizedPicture);
  }

  if (!content.childNodes.length) return;
  inner.append(content);

  if (media.childNodes.length) inner.append(media);
  else block.classList.add('cta-no-media');

  block.replaceChildren(inner);
}
