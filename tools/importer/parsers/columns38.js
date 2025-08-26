/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column as required
  const headerRow = ['Columns (columns38)'];

  // Each immediate child div is a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Content row: one cell per column
  const contentRow = columnDivs;

  // Build table: header is always a single cell, content row matches columns
  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
