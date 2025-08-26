/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards21)'];

  // Only process cards if found
  // The card is inside a .card-body
  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [headerRow];
  cardBodies.forEach(cardBody => {
    // Find the image (mandatory)
    const img = cardBody.querySelector('img');
    // Find the heading (optional)
    const heading = cardBody.querySelector('.h4-heading');

    // Compose text cell: strong heading if present
    let textCell = '';
    if (heading) {
      // Use the actual element for strong/heading style
      // If it's already strong or h4, use as is
      textCell = heading;
    }
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
