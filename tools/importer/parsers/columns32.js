/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid (columns) wrapper
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children of the grid as columns
  const columns = Array.from(grid.children);
  // Defensive: skip empty columns
  if (columns.length < 2) return;

  // Table header as per block name
  const headerRow = ['Columns (columns32)'];
  // Each cell in the second row is a column's content.
  const contentRow = columns;
  const tableCells = [
    headerRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}