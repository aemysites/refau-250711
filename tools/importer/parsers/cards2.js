/* global WebImporter */
export default function parse(element, { document }) {
  // Utility: Get tag element (optional)
  function getTag(card) {
    const tag = card.querySelector('.tag');
    return tag || null;
  }

  // Utility: Get heading element (h3/h4/h2/h5/h6)
  function getTitle(card) {
    return card.querySelector('h2, h3, h4, h5, h6');
  }

  // Utility: Get description paragraph
  function getDescription(card) {
    return card.querySelector('p');
  }

  // Utility: Get image element (if any)
  function getImage(card) {
    // Image is always inside a div[class*="aspect"]
    const imgWrap = card.querySelector('div[class*="aspect"]');
    if (imgWrap) {
      const img = imgWrap.querySelector('img');
      return img || null;
    }
    return null;
  }

  // Compose text cell content as array of elements for resilience
  function buildTextCell(card) {
    const cellContent = [];
    const tag = getTag(card);
    if (tag) cellContent.push(tag);
    const title = getTitle(card);
    if (title) cellContent.push(title);
    const desc = getDescription(card);
    if (desc) cellContent.push(desc);
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  }

  // Main block structure
  const headerRow = ['Cards (cards2)'];
  const rows = [];

  // Find the main grid
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // First card: big image, tag, heading, paragraph ("Fresh fits, bold moves")
    const firstCard = grid.querySelector('a.utility-link-content-block');
    if (firstCard) {
      const img = getImage(firstCard);
      const textCell = buildTextCell(firstCard);
      rows.push([img, textCell]);
    }
    // There are two flex-horizontal groups: one with two cards (with images), one with several text-only cards
    const flexGroups = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
    if (flexGroups[0]) {
      // Cards with images ("Game, set, match style" and "Sunkissed & styled out")
      flexGroups[0].querySelectorAll('a.utility-link-content-block').forEach(card => {
        const img = getImage(card);
        const textCell = buildTextCell(card);
        rows.push([img, textCell]);
      });
    }
    if (flexGroups[1]) {
      // Cards with only text ("Party after dark", ...)
      flexGroups[1].querySelectorAll('a.utility-link-content-block').forEach(card => {
        // These don't have images
        rows.push(['', buildTextCell(card)]);
      });
    }
  }

  // If no cards found, do nothing
  if (rows.length === 0) return;
  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
