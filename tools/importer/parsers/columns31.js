/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row: exactly one column, matching the example
  const headerRow = ['Columns (columns31)'];

  // Find the grid container (where columns are)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  // Defensive: If empty, do nothing
  if (columns.length === 0) return;

  // One row for the columns, each original column div as a cell
  const contentRow = columns.map(col => col);

  // Compose the table: first row is header, second row is columns
  const tableCells = [
    headerRow,
    contentRow,
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
