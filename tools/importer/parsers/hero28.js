/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: block name exactly as in example
  const headerRow = ['Hero (hero28)'];

  // 2. Image Row: extract background image (if present)
  let imageEl = null;
  // Try to find an image inside the .ix-parallax-scale-out-hero block
  const parallaxWrap = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxWrap) {
    imageEl = parallaxWrap.querySelector('img');
  }
  // fallback: find any image in the element
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  const imageRow = [imageEl || ''];

  // 3. Text Row: headline, subhead, CTA
  let textCellContent = [];
  // The text is usually in the second column of the grid
  const grid = element.querySelector('.grid-layout');
  let textCol = null;
  if (grid && grid.children.length > 1) {
    textCol = grid.children[1];
  }
  // If not found, fallback to any heading
  textCol = textCol || element;

  // Main heading
  const mainHeading = textCol.querySelector('h1');
  if (mainHeading) {
    textCellContent.push(mainHeading);
  }
  // Subheading (look for h2 or h3, if present)
  const subHeading = textCol.querySelector('h2');
  if (subHeading) {
    textCellContent.push(subHeading);
  }
  const subSubHeading = textCol.querySelector('h3');
  if (subSubHeading) {
    textCellContent.push(subSubHeading);
  }

  // Paragraphs (if present)
  const paragraphs = textCol.querySelectorAll('p');
  if (paragraphs.length) {
    paragraphs.forEach(p => textCellContent.push(p));
  }

  // Call-to-action: look for a button/link group
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup && buttonGroup.children.length > 0) {
    // Add all buttons/links that are children of the button group
    Array.from(buttonGroup.children).forEach(child => textCellContent.push(child));
  }

  // If we found nothing, fallback to the text column itself
  if (textCellContent.length === 0) {
    textCellContent = [textCol];
  }

  const textRow = [textCellContent.length > 1 ? textCellContent : textCellContent[0]];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
