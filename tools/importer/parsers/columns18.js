/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block specification
  const headerRow = ['Columns (columns18)'];

  // Get grid container (holds columns)
  const grid = element.querySelector('.grid-layout') || element;
  const gridChildren = Array.from(grid.children);

  // Find left column (contains headings and contact info) and right column (image)
  let leftCol = null;
  let contactList = null;
  let imageEl = null;

  // Try to find leftCol (with h2 or h3 headings)
  leftCol = gridChildren.find((child) => child.querySelector('h2, h3'));

  // Find contact list (ul)
  contactList = element.querySelector('ul');

  // Find image (img)
  imageEl = element.querySelector('img');

  // Prepare left column composite content
  const leftColContent = [];
  if (leftCol) {
    // Add all direct children that are headings or paragraph
    const h2 = leftCol.querySelector('h2');
    if (h2) leftColContent.push(h2);
    const h3 = leftCol.querySelector('h3');
    if (h3) leftColContent.push(h3);
    const p = leftCol.querySelector('p');
    if (p) leftColContent.push(p);
  }
  if (contactList) leftColContent.push(contactList);

  // Compose table row (columns)
  const row = [leftColContent, imageEl].map((content) => {
    if (!content) return '';
    return Array.isArray(content) ? content : content;
  });

  // Cells for table
  const cells = [headerRow, row];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
