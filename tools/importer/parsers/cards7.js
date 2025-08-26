/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Cards (cards7)'];

  // Get all card containers (each .utility-aspect-1x1 is a card, each contains one img)
  const cardDivs = element.querySelectorAll(':scope > div');

  // The screenshot and example only show images (no accompanying text content), so each card is just image in col 1, blank in col 2
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find img inside the card
    const img = cardDiv.querySelector('img');
    // Reference the img directly for cell 1, empty string for cell 2 (no text in HTML)
    return [img, ''];
  });

  // Final table: header row, then one row per card
  const cells = [
    headerRow,
    ...rows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
