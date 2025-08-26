/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cards19)'];

  // Get all immediate child card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // First cell: Icon (SVG inside .icon div)
    const iconDiv = card.querySelector('.icon');
    // Second cell: Text content (the <p> tag)
    const textP = card.querySelector('p');
    // Reference existing elements; if not found, fallback to empty elements
    return [iconDiv || document.createElement('span'), textP || document.createElement('span')];
  });

  const tableArr = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
