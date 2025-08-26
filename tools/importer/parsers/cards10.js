/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the example
  const headerRow = ['Cards (cards10)'];
  // Each card is a direct <a> child of the grid
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // Image cell: find first <img> inside the card (image always exists)
    const img = card.querySelector('img');
    // Textual content cell: group tag, heading, and description preserving order and structure
    const textContents = [];
    // Tag (optional, as DIV > tag-group > tag)
    const tag = card.querySelector('.tag-group .tag');
    if (tag) textContents.push(tag);
    // Heading (optional, as H3 or .h4-heading)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textContents.push(heading);
    // Description (optional, as P or .paragraph-sm)
    const desc = card.querySelector('p, .paragraph-sm');
    if (desc) textContents.push(desc);
    return [img, textContents];
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
