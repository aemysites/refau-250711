/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');

  // Defensive: if not found, fallback to all immediate child divs
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    // Find first direct child div and img
    const children = Array.from(grid.children);
    leftCol = children.find((el) => el.tagName === 'DIV');
    rightCol = children.find((el) => el.tagName === 'IMG');
  } else {
    // fallback: search element for first div and first img
    leftCol = element.querySelector('div');
    rightCol = element.querySelector('img');
  }

  // If missing columns, replace with empty element
  if (!leftCol) {
    leftCol = document.createElement('div');
  }
  if (!rightCol) {
    rightCol = document.createElement('div');
  }

  // Header row from the example
  const headerRow = ['Columns (columns27)'];
  // Content row, two columns
  const columnsRow = [leftCol, rightCol];

  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
