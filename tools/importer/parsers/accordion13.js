/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as in the example
  const rows = [
    ['Accordion (accordion13)'],
  ];

  // Each divider is a row in the accordion table
  // Get all direct children with class 'divider'
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each divider contains a grid with two divs: heading and body
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length < 2) return;
    // Reference existing elements directly
    const titleElem = gridChildren[0];
    const contentElem = gridChildren[1];
    rows.push([titleElem, contentElem]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element in the DOM
  element.replaceWith(table);
}
