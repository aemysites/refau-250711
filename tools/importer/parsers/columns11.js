/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: single cell spanning all columns
  const headerRow = ['Columns (columns11)'];

  // --- Top content (2 columns)
  // Find main grid containing headline and content
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftTop, rightTop;
  if (mainGrid && mainGrid.children.length >= 2) {
    leftTop = mainGrid.children[0]; // Headline/eyebrow
    rightTop = mainGrid.children[1]; // Description, author, button
  } else {
    leftTop = document.createElement('div');
    rightTop = document.createElement('div');
  }

  // --- Images grid (2 columns)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgLeft, imgRight;
  if (imagesGrid && imagesGrid.children.length >= 2) {
    imgLeft = imagesGrid.children[0];
    imgRight = imagesGrid.children[1];
  } else {
    imgLeft = document.createElement('div');
    imgRight = document.createElement('div');
  }

  // Compose cells array with a single header cell, followed by two rows of two columns each
  const cells = [
    headerRow,                           // Single-cell header row
    [leftTop, rightTop],                 // First content row (2 columns)
    [imgLeft, imgRight],                 // Second content row (2 columns)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
