/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get the immediate children of the grid (these are the 'columns')
  const columns = Array.from(grid.children);
  // Edge case: If there are no columns, do nothing
  if (!columns.length) return;

  // 3. Header row matches exactly: 'Columns (columns3)'
  const headerRow = ['Columns (columns3)'];

  // 4. The block is a 2-row table: header, then the columns
  // Each cell references the full column element (no cloning, no markdown)
  // Semantic meaning is preserved: headings, paragraphs, links remain as-is
  const cellsRow = columns.map(col => col);

  // 5. Construct the table
  const tableData = [headerRow, cellsRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace the section with the block table
  element.replaceWith(blockTable);
}
