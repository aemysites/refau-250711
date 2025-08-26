/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) return;

  // Get all tab links (labels)
  const tabLinks = Array.from(tabMenu.children);
  // Get all tab panes (content)
  const tabPanes = Array.from(tabContent.children);

  // Table must have a header row with exactly one column 'Tabs'
  const rows = [['Tabs']];

  // For each tab, add a row: [Tab Label, Tab Content]
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Get the label from the first element child (usually a div), else the link text
    let label = '';
    if (link.firstElementChild) {
      label = link.firstElementChild.textContent.trim();
    } else {
      label = link.textContent.trim();
    }
    // Find matching tab panel by data-w-tab
    let tabPane = null;
    const tabName = link.getAttribute('data-w-tab');
    if (tabName) {
      tabPane = tabPanes.find(p => p.getAttribute('data-w-tab') === tabName);
    } else {
      tabPane = tabPanes[i];
    }
    // Defensive: if no tabPane found, use empty cell
    let contentCell = '';
    if (tabPane) {
      // If there's a single wrapper in tabPane, use its only child, else use the pane itself
      if (tabPane.children.length === 1) {
        contentCell = tabPane.firstElementChild;
      } else {
        contentCell = tabPane;
      }
    }
    // Each tab row must have exactly two columns
    rows.push([label, contentCell]);
  }

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
