/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Header row: single cell (to be rendered as a colspan by importer logic)
  const headerRow = ['Columns (columns29)'];
  // Content row: one cell per column
  const contentRow = columns;
  // Table cells: first row is header, second is content
  const cells = [headerRow, contentRow];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
