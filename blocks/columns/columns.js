export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row, index) => {
    row.classList.add('columns-row');
    row.classList.add(index % 2 === 0 ? 'columns-row-even' : 'columns-row-odd');
    let imageColumns = 0;

    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        imageColumns += 1;
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        } else {
          col.classList.add('columns-media-content-col');
        }
      } else {
        col.classList.add('columns-content-col');
      }
    });

    if (imageColumns === 0) row.classList.add('columns-text-only');
    if (imageColumns === row.children.length) row.classList.add('columns-images-only');
  });
}
