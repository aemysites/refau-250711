/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container directly under the container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of grid is a column (logo/social, Trends, Inspire, Explore)
  const columns = Array.from(grid.children);

  // Defensive: skip empty columns
  const contentRow = columns.map(col => col);

  // Block header as required
  const headerRow = ['Columns (columns9)'];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
