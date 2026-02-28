export default function decorate(block) {
  const picture = block.querySelector('picture');

  if (!picture) {
    block.classList.add('hero-no-image');
    return;
  }

  const pictureContainer = picture.closest('p, div');
  if (pictureContainer && pictureContainer !== block && pictureContainer.children.length === 1) {
    pictureContainer.replaceWith(picture);
  } else if (picture.parentElement !== block) {
    picture.remove();
    block.prepend(picture);
  }

  const content = document.createElement('div');
  content.className = 'hero-content';

  [...block.childNodes].forEach((node) => {
    if (node === picture) return;
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
    content.append(node);
  });

  if (content.childNodes.length) {
    block.append(content);
  } else {
    block.classList.add('hero-no-content');
  }
}
