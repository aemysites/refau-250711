/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Get all direct children that could be cards
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach(card => {
    // Find the first image in the card
    const img = card.querySelector('img');
    // Find the content block (usually contains heading and paragraph)
    const contentBox = card.querySelector('.utility-padding-all-2rem');

    let textCell = '';
    if (contentBox) {
      // Use the whole content box to preserve heading, paragraph, etc.
      textCell = contentBox;
    }

    if (img) {
      cells.push([
        img,
        textCell
      ]);
    }
  });

  // Only replace if we have at least one card (beyond header)
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
