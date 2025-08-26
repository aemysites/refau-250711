/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main top-level container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid containing the block content
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The grid's children:
  // [0]=h2, [1]=paragraph, [2]=nested grid with divider, avatar+author, logo svg
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;
  const h2 = gridChildren[0];
  const para = gridChildren[1];
  const nestedGrid = gridChildren[2];

  // Defensive: make sure nested grid exists
  let leftColContent = [];
  let rightColContent = [];

  // LEFT COLUMN: Heading, divider, author
  if (h2) leftColContent.push(h2);
  if (nestedGrid && nestedGrid.children.length >= 2) {
    const divider = nestedGrid.children[0];
    const authorRow = nestedGrid.children[1];
    if (divider) leftColContent.push(divider);
    if (authorRow) leftColContent.push(authorRow);
  }

  // RIGHT COLUMN: Quote + svg logo
  if (para) rightColContent.push(para);
  if (nestedGrid && nestedGrid.children.length >= 3) {
    const svgLogo = nestedGrid.children[2];
    if (svgLogo) rightColContent.push(svgLogo);
  }

  // Assemble cells for the block table
  const headerRow = ['Columns (columns26)'];
  const contentRow = [leftColContent, rightColContent];
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
