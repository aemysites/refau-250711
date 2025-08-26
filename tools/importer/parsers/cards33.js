/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as example
  const headerRow = ['Cards (cards33)'];
  const cells = [headerRow];

  // Get all direct card <a> children
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // First image inside card
    const img = card.querySelector('img');
    // Text content is the <div> after the image
    const contentDiv = img ? img.nextElementSibling : null;
    let textCell;
    if (contentDiv) {
      // Remove last "Read" <div> if present and not a link (non-semantic)
      const lastDiv = contentDiv.lastElementChild;
      if (lastDiv && lastDiv.tagName === 'DIV' && lastDiv.textContent.trim().toLowerCase() === 'read') {
        contentDiv.removeChild(lastDiv);
      }
      textCell = contentDiv;
    } else {
      // fallback: use card if structure is different
      textCell = card;
    }
    // Push row: image, text content (both referenced, not cloned)
    cells.push([img, textCell]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
