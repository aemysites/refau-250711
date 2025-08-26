/* global WebImporter */
export default function parse(element, { document }) {
  // The example markdown has a single table, header: "Carousel"
  // Each subsequent row has 2 columns: image, and optional text content (empty for these slides)
  // No Section Metadata block in the example, so none should be created

  // Prepare header row
  const cells = [['Carousel']];

  // Find the grid container holding the slides
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // For each direct child (a slide)
    Array.from(grid.children).forEach(slide => {
      // Find the image inside this slide structure
      let img = null;
      // There may be a .utility-aspect-2x3, or direct img
      const imgContainer = slide.querySelector('.utility-aspect-2x3');
      if (imgContainer) {
        img = imgContainer.querySelector('img');
      }
      if (!img) {
        img = slide.querySelector('img');
      }
      // Per spec, first cell is the image, second cell is text content (none here)
      // We must reference the actual element from the DOM
      cells.push([
        img || '',
        '' // No text content available in this HTML
      ]);
    });
  }
  // Replace the original element with the parsed block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
