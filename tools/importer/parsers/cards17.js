/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have two columns to match the content rows
  const headerRow = ['Cards (cards17)', ''];
  const cells = [headerRow];

  // Get all card divs
  const cardDivs = element.querySelectorAll(':scope > div.utility-aspect-1x1');
  cardDivs.forEach(div => {
    const img = div.querySelector('img');
    if (img) {
      // Each row: image and empty text cell
      cells.push([img, '']);
    }
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
