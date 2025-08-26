/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header row - must exactly match the example
  const headerRow = ['Cards (cards24)'];

  // Find all direct card links (assumes :scope is not supported, so filter children)
  const cardLinks = Array.from(element.children).filter(el => el.classList.contains('utility-link-content-block'));

  const rows = cardLinks.map(card => {
    // 1. Image (first cell)
    let imageEl = null;
    const aspectDiv = Array.from(card.children).find(child => child.classList.contains('utility-aspect-2x3'));
    if (aspectDiv) {
      imageEl = aspectDiv.querySelector('img');
    }

    // 2. Text Content (second cell)
    const textContent = [];
    // Tag and date row (if present)
    const tagGroup = Array.from(card.children).find(child => child.classList.contains('flex-horizontal'));
    if (tagGroup) {
      // Tag
      const tag = tagGroup.querySelector('.tag');
      if (tag) {
        // Use the original tag element, but remove any margin classes
        tag.className = 'tag';
        textContent.push(tag);
      }
      // Space between tag and date if both exist
      const date = tagGroup.querySelector('.paragraph-sm');
      if (date) {
        if (tag) textContent.push(document.createTextNode(' '));
        // Use the original date element
        date.className = 'paragraph-sm';
        textContent.push(date);
      }
      // Add a <br> after the tag/date line if present
      if (tag || date) textContent.push(document.createElement('br'));
    }
    // Heading
    const heading = Array.from(card.children).find(child => child.tagName && child.tagName.match(/^H\d$/i));
    if (heading) {
      textContent.push(heading);
    }
    // No additional description in this markup
    return [imageEl, textContent];
  });

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
