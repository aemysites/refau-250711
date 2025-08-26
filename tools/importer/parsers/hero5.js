/* global WebImporter */
export default function parse(element, { document }) {
  // Get the direct child grid which contains the image and content
  const grids = element.querySelectorAll(':scope > .w-layout-grid');
  let mainGrid = null;
  for (const g of grids) {
    if (g.classList.contains('grid-layout')) {
      mainGrid = g;
      break;
    }
  }
  if (!mainGrid) {
    // fallback to any direct w-layout-grid
    mainGrid = grids[0];
  }

  // Get the image (background/hero image)
  let imageEl = null;
  // The image is likely a direct child of mainGrid
  for (const child of mainGrid.children) {
    if (child.tagName === 'IMG') {
      imageEl = child;
      break;
    }
  }

  // Get the headline/content block
  let contentBlock = null;
  // The content is likely in an inner grid within mainGrid
  for (const child of mainGrid.children) {
    if (child.classList && child.classList.contains('w-layout-grid')) {
      // Look for a heading inside
      const innerGrid = child;
      for (const grandChild of innerGrid.children) {
        if (grandChild.querySelector('h1,h2,h3,h4,h5,h6')) {
          contentBlock = grandChild;
          break;
        }
      }
    }
  }
  // Fallback: if nothing found, try any element with a heading
  if (!contentBlock) {
    contentBlock = element.querySelector('h1,h2,h3,h4,h5,h6')?.parentElement || null;
  }

  // Compose rows for the block table
  const rows = [];
  rows.push(['Hero (hero5)']);
  rows.push([imageEl].filter(Boolean));
  rows.push([contentBlock].filter(Boolean));

  // Create and replace with the hero table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
