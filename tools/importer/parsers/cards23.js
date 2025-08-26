/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract cards from a grid-layout
  function extractCardsFromGrid(grid) {
    const rows = [];
    const cards = Array.from(grid.children);
    cards.forEach((card) => {
      let img = card.querySelector('img'); // Reference existing image element if present
      let textContainer = document.createElement('div');
      // For cards with image
      if (img) {
        const title = card.querySelector('h3'); // Reference existing heading
        const desc = card.querySelector('div.paragraph-sm'); // Reference existing description
        if (title) textContainer.appendChild(title);
        if (desc) textContainer.appendChild(desc);
        rows.push([img, textContainer]);
      } else {
        // For cards without image, e.g. only text
        let title = card.querySelector('h3');
        let desc = card.querySelector('div.paragraph-sm');
        if (title) textContainer.appendChild(title);
        if (desc) textContainer.appendChild(desc);
        rows.push(['', textContainer]);
      }
    });
    return rows;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const allTabPanes = element.querySelectorAll('.w-tab-pane');
  const allRows = [];
  allTabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const rows = extractCardsFromGrid(grid);
      allRows.push(...rows);
    }
  });

  // Table header row (must match the example)
  const cells = [
    ['Cards (cards23)'],
    ...allRows
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
