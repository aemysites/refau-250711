/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in spec
  const headerRow = ['Hero (hero12)'];

  // --- Background Image Row ---
  // Find the outermost absolutely positioned background image (first image in the grid)
  let bgImg = element.querySelector('.utility-position-absolute.cover-image');
  let backgroundRow = [bgImg || ''];

  // --- Content Row ---
  // Find the content container (contains headline, subpoints, button, etc)
  // Try to get the card-body, which is the main content holder
  let cardBody = element.querySelector('.card-body');
  let contentRow = [cardBody || ''];

  // Compose the table rows
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  
  // Create the block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
