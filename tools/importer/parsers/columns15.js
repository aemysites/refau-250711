/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;
  // Find the main container (should include the grid)
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the grid for the columns layout
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get both columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // LEFT COLUMN - Get ALL content (headings, subheading, button group)
  const leftCol = gridChildren[0];
  // Collect all direct children (including text nodes with only whitespace filtered out)
  const leftContentEls = Array.from(leftCol.childNodes).filter(
    (n) => (n.nodeType === 1 && n.textContent.trim()) || (n.nodeType === 3 && n.textContent.trim())
  );

  // If leftContentEls is empty (which shouldn't happen), fallback to the leftCol itself
  const leftCell = leftContentEls.length > 0 ? leftContentEls : [leftCol];

  // RIGHT COLUMN - Should be the image only
  const rightCol = gridChildren[1];
  // Find the first img in the right column
  const img = rightCol.querySelector('img');
  // If no image, fallback to all children (shouldn't happen in this layout)
  const rightCell = img ? img : rightCol;

  // Compose table
  const cells = [
    ['Columns (columns15)'],
    [leftCell, rightCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
