/**
 * Unified Navigation Component
 * Generates consistent header/nav across all pages
 */

function renderNavigation(activePage = 'home') {
  const navHTML = `
    <header class="header">
      <div class="logo-lockup">
        <img src="/public/assets/branding/pursuit-logo-primary.svg" alt="Pursuit Bank" class="logo">
        <a href="/public/index.html" class="wordmark">Pursuit Bank SOPs</a>
      </div>
      <nav class="nav">
        <a href="/public/index.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">Dashboard</a>
        <a href="/public/workspace.html" class="nav-link ${activePage === 'workspace' ? 'active' : ''}">Workspace</a>
        <a href="/public/sops.html" class="nav-link ${activePage === 'sops' ? 'active' : ''}">SOPs</a>
        <a href="/public/graph.html" class="nav-link ${activePage === 'graph' ? 'active' : ''}">Graph</a>
        <a href="/public/search.html" class="nav-link ${activePage === 'search' ? 'active' : ''}">Search</a>
        <a href="/public/contribute.html" class="nav-link ${activePage === 'contribute' ? 'active' : ''}">Contribute</a>
        <a href="/public/help.html" class="help-link ${activePage === 'help' ? 'active' : ''}">
          <span>❓</span>
          <span>Help</span>
        </a>
      </nav>
    </header>
  `;
  
  // Insert at beginning of body
  const headerElement = document.createElement('div');
  headerElement.innerHTML = navHTML;
  document.body.insertBefore(headerElement.firstElementChild, document.body.firstChild);
}

function renderBreadcrumb(breadcrumbs = []) {
  if (!breadcrumbs || breadcrumbs.length === 0) return;
  
  const bcHTML = `
    <div class="breadcrumb">
      ${breadcrumbs.map((item, idx) => `
        ${idx > 0 ? '<span class="breadcrumb-separator">/</span>' : ''}
        ${item.url 
          ? `<a href="${item.url}" class="breadcrumb-item">${item.label}</a>` 
          : `<span class="breadcrumb-item active">${item.label}</span>`
        }
      `).join('')}
    </div>
  `;
  
  const bcElement = document.createElement('div');
  bcElement.innerHTML = bcHTML;
  
  const header = document.querySelector('.header');
  if (header) {
    header.insertAdjacentElement('afterend', bcElement.firstElementChild);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Extract page name from current URL
  const pathname = window.location.pathname;
  let activePage = 'home';
  
  if (pathname.includes('workspace')) activePage = 'workspace';
  else if (pathname.includes('sops')) activePage = 'sops';
  else if (pathname.includes('graph')) activePage = 'graph';
  else if (pathname.includes('search')) activePage = 'search';
  else if (pathname.includes('contribute')) activePage = 'contribute';
  else if (pathname.includes('help')) activePage = 'help';
  else activePage = 'dashboard';
  
  renderNavigation(activePage);
});
