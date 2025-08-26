/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container that holds the grid columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The structure is:
  // [0] - Taylor Brooks (name)
  // [1] - Tag group (vertical list)
  // [2] - H2 (heading)
  // [3] - Paragraphs (rich text)

  const columns = Array.from(grid.children);
  // Defensive in case children are missing
  const nameCol = columns[0] || document.createElement('div');

  // Compose the right column (tags, heading, paragraphs)
  const rightCol = document.createElement('div');
  if (columns[1]) rightCol.appendChild(columns[1]);
  if (columns[2]) rightCol.appendChild(columns[2]);
  if (columns[3]) rightCol.appendChild(columns[3]);

  const headerRow = ['Columns (columns30)'];
  const contentRow = [nameCol, rightCol];
  
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}
