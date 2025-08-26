/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header: matches example
  const headerRow = ['Hero (hero20)'];

  // 2. Background: all collage images in a single cell
  let images = [];
  // Look for the grid-layout with images
  const grids = element.querySelectorAll('.grid-layout');
  let foundImages = false;
  for (const grid of grids) {
    const imgs = Array.from(grid.querySelectorAll('img'));
    if (imgs.length > 0) {
      images = imgs;
      foundImages = true;
      break;
    }
  }
  const backgroundCell = images.length > 0 ? images : [''];

  // 3. Content cell: heading, subheading, buttons
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (!contentContainer) {
    // fallback: in case selector fails
    contentContainer = element.querySelector('h1')?.closest('div');
  }
  let contentCell = [''];
  if (contentContainer) {
    // collect heading, subheading, cta group in order
    const contentItems = [];
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentItems.push(h1);
    const p = contentContainer.querySelector('p');
    if (p) contentItems.push(p);
    const ctas = contentContainer.querySelector('.button-group');
    if (ctas) contentItems.push(ctas);
    if (contentItems.length > 0) {
      contentCell = contentItems;
    }
  }

  // Compose table as 1 column, 3 rows
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
