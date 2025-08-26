/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name exactly as in example
  const headerRow = ['Hero (hero35)'];
  // 2. Background image row (no image in provided HTML)
  const backgroundRow = [''];

  // 3. Content row: includes title, subheading, CTA
  // Find main content inside grid
  let contentParts = [];
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Get all immediate children of the grid
    const gridChildren = grid.querySelectorAll(':scope > *');
    let headingDiv = null;
    let ctaLink = null;
    gridChildren.forEach(child => {
      if (child.tagName === 'A') {
        ctaLink = child;
      } else {
        headingDiv = child;
      }
    });
    if (headingDiv) {
      // Reference all children (headings, paragraphs, etc)
      Array.from(headingDiv.children).forEach(el => {
        contentParts.push(el);
      });
    }
    if (ctaLink) {
      contentParts.push(ctaLink);
    }
  } else {
    // Fallback: just grab all children of element
    contentParts = Array.from(element.children);
  }

  // Compose cells in the order: header, background, content
  const cells = [headerRow, backgroundRow, [contentParts]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
