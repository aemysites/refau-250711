/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the two columns)
  const columnElements = Array.from(grid.children); // [img, content]
  // Defensive: Only continue if we have at least 2 columns
  if (columnElements.length < 2) return;

  // Table header matches exactly
  const headerRow = ['Columns (columns1)'];

  // Table second row: each cell is a column
  // Reference the entire column elements to preserve all nested structure
  const contentRow = [columnElements[0], columnElements[1]];

  // Assemble cells array
  const cells = [headerRow, contentRow];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
