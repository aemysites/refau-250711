/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name exactly
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Find all direct children that are accordion items
  const accordionItems = element.querySelectorAll(':scope > .accordion');
  accordionItems.forEach((item) => {
    // Title cell: find the .paragraph-lg inside .w-dropdown-toggle
    let titleCell = null;
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    if (toggle) {
      const title = toggle.querySelector('.paragraph-lg');
      if (title) {
        titleCell = title;
      } else {
        // If .paragraph-lg missing, use toggle itself
        titleCell = toggle;
      }
    } else {
      // Fallback: empty div to keep structure
      titleCell = document.createElement('div');
    }

    // Content cell: inside nav.accordion-content, find the utility-padding div
    let contentCell = null;
    const nav = item.querySelector(':scope > nav.accordion-content');
    if (nav) {
      // Usually 1 child div with utility-padding classes
      const padDiv = nav.querySelector(':scope > div');
      if (padDiv) {
        contentCell = padDiv;
      } else {
        // Fallback: use nav itself
        contentCell = nav;
      }
    } else {
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
