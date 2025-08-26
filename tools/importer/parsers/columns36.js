/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (two columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Columns: text column (left), images column (right)
  const gridColumns = Array.from(grid.children);
  if (gridColumns.length < 2) return;

  // LEFT CELL: grab all text content in left column as a fragment
  const leftCol = gridColumns[0];
  const leftFrag = document.createDocumentFragment();
  // Only include non-empty elements
  Array.from(leftCol.children).forEach(child => {
    if (child.textContent.trim() || child.querySelector('img,svg,video,a,button')) {
      leftFrag.appendChild(child);
    }
  });

  // RIGHT CELL: grab just the images grid
  const rightCol = gridColumns[1];
  // The images are inside a .w-layout-grid within rightCol
  const imgGrid = rightCol.querySelector('.w-layout-grid');
  let rightFrag;
  if (imgGrid) {
    rightFrag = document.createDocumentFragment();
    // Only keep img elements
    imgGrid.querySelectorAll('img').forEach(img => {
      rightFrag.appendChild(img);
    });
  } else {
    // fallback: if no image grid, maybe only images in rightCol
    rightFrag = document.createDocumentFragment();
    rightCol.querySelectorAll('img').forEach(img => {
      rightFrag.appendChild(img);
    });
  }

  const cells = [
    ['Columns (columns36)'],
    [leftFrag, rightFrag],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
