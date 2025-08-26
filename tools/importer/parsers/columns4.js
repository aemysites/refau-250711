/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: exactly one cell (single column) as required
  const headerRow = ['Columns (columns4)'];

  // Get all immediate child divs (each is a grid cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Second row: each cell is the image from each column
  const secondRow = columnDivs.map(div => {
    // Use only the image element in each div, if present
    const img = div.querySelector('img');
    return img || div;
  });

  // Compose table: header (single cell), second row (one cell per column)
  const cells = [
    headerRow,
    secondRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
