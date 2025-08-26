/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: EXACT match to example
  const headerRow = ['Hero (hero6)'];

  // 2. Row 2: Background Image (img only)
  let bgImg = null;
  // Try to get a direct child img decently specific for hero bg
  const bgImgDiv = element.querySelector(
    '.utility-min-height-100dvh, .utility-position-relative'
  );
  if (bgImgDiv) {
    const candidateImg = bgImgDiv.querySelector('img');
    if (candidateImg) {
      bgImg = candidateImg;
    }
  }
  if (!bgImg) {
    // fallback: first img under element
    bgImg = element.querySelector('img');
  }

  // 3. Row 3: Hero Content (heading, subheading, CTAs)
  // Find the card containing headings/subheading/buttons
  let contentEl = null;
  // Prioritize .card, but fallback cleanly
  contentEl = element.querySelector('.card');

  // Edge case: if card not found, try to combine all text+buttons in grid area
  if (!contentEl) {
    const grids = element.querySelectorAll('.grid-layout');
    for (const grid of grids) {
      if (grid !== bgImgDiv) {
        contentEl = grid;
        break;
      }
    }
    // Final fallback: just use element
    if (!contentEl) contentEl = element;
  }

  // 4. Table assembly: 1 column, 3 rows (header, bg image, content)
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentEl ? contentEl : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
