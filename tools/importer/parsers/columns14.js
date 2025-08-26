/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get immediate children of the grid (columns)
  const columns = Array.from(grid.children);

  // 3. Defensive behavior for missing columns
  if (columns.length < 2) {
    const cells = [['Columns (columns14)'], [columns.length === 1 ? columns[0] : element]];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // 4. Prepare content for left and right columns
  const leftCol = columns[0];
  let rightCellContent = [];
  if (columns[1].children && columns[1].children.length > 0) {
    rightCellContent = Array.from(columns[1].children);
  } else {
    rightCellContent = [columns[1]];
  }

  // 5. Header row: single cell, even if there are two columns in data row
  const headerRow = ['Columns (columns14)'];
  const contentRow = [leftCol, rightCellContent];
  const cells = [headerRow, contentRow];

  // 6. Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
