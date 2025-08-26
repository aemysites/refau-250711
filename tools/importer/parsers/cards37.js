/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get direct card links from a parent node
  function getCardLinks(parent) {
    return Array.from(parent.children).filter(
      (child) =>
        child.tagName === 'A' &&
        child.classList.contains('utility-link-content-block')
    );
  }

  // Find the main grid containing cards
  let mainGrid = element.querySelector('.w-layout-grid');
  if (!mainGrid) {
    mainGrid = element.querySelector('.grid-layout');
  }
  if (!mainGrid) {
    // fallback: look for all grid-layouts and use the one with most children
    const allGrids = Array.from(element.querySelectorAll('.w-layout-grid, .grid-layout'));
    mainGrid = allGrids.sort((a, b) => b.childElementCount - a.childElementCount)[0];
  }
  if (!mainGrid) return;

  // Gather all card anchors (including nested grids)
  let cardLinks = getCardLinks(mainGrid);
  mainGrid.querySelectorAll('.w-layout-grid, .grid-layout').forEach((grid) => {
    cardLinks = cardLinks.concat(getCardLinks(grid));
  });
  cardLinks = Array.from(new Set(cardLinks));

  const rows = [['Cards (cards37)']];

  cardLinks.forEach((card) => {
    // Image: first .utility-aspect-2x3 or .utility-aspect-1x1 > img, else first img
    let img = null;
    let imgContainer = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if(imgContainer) {
      img = imgContainer.querySelector('img');
    }
    if(!img) {
      img = card.querySelector('img');
    }

    // Title: look for heading (h2, h3, h4, h5)
    let heading = card.querySelector('h2, h3, h4, h5');

    // Description paragraph
    let desc = card.querySelector('p');

    // Call-to-action, if present (button or .button or .utility-button)
    let cta = card.querySelector('.button, .utility-button, button, a.button');

    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);

    rows.push([
      img || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
