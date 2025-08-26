/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero39)'];

  // Retrieve background image (first img in block)
  let bgImg = null;
  const allImgs = element.querySelectorAll('img');
  if (allImgs.length > 0) {
    bgImg = allImgs[0];
  }

  // Retrieve content cell (text and cta)
  let contentCell = null;
  // The text+cta content is always in grid-layout's second child
  const gridLayout = element.querySelector('.grid-layout');
  if (gridLayout) {
    const gridChildren = Array.from(gridLayout.children);
    if (gridChildren.length > 1) {
      // Usually the second child (index 1) has text + cta
      const contentContainer = gridChildren[1];
      // Within that, we want the deepest .w-layout-grid (that's the real content)
      const layoutGrids = contentContainer.querySelectorAll('.w-layout-grid');
      if (layoutGrids.length) {
        contentCell = layoutGrids[layoutGrids.length - 1]; // the deepest
      } else {
        contentCell = contentContainer;
      }
    }
  }

  // Assemble cells
  const cells = [
    headerRow,
    [bgImg].filter(Boolean),
    [contentCell].filter(Boolean),
  ];

  // Remove empty rows if content is missing (defensive)
  const finalCells = [cells[0]];
  if (cells[1][0]) finalCells.push(cells[1]);
  if (cells[2][0]) finalCells.push(cells[2]);

  const table = WebImporter.DOMUtils.createTable(finalCells, document);
  element.replaceWith(table);
}
