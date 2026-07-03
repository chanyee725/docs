function findLogoTabsSlot() {
  const logoLink = document.querySelector('#navbar a[href="/"]');
  const slot = logoLink?.nextElementSibling;

  if (!slot || !slot.classList.contains('hidden')) {
    return null;
  }

  return slot;
}

function hideNavbarTabsRow() {
  const row = document.getElementById('navbar-tabs-row');

  if (row) {
    row.style.display = 'none';
  }
}

function repositionNavbarTabs() {
  const navTabs = document.querySelector('.nav-tabs');

  if (!navTabs) {
    return;
  }

  const slot =
    document.getElementById('navbar-tabs-inline-slot') || findLogoTabsSlot();

  if (!slot) {
    return;
  }

  if (!document.getElementById('navbar-tabs-row')) {
    const tabsRow = navTabs.closest('.hidden.lg\\:flex.px-12');

    if (tabsRow) {
      tabsRow.id = 'navbar-tabs-row';
    }
  }

  slot.id = 'navbar-tabs-inline-slot';

  if (navTabs.parentElement !== slot) {
    slot.appendChild(navTabs);
  }

  hideNavbarTabsRow();
  document.documentElement.dataset.navbarTabsInline = 'true';
}

function repositionNavbarSearch() {
  const searchBtn = document.getElementById('search-bar-entry');
  const dashboardLi = document.getElementById('topbar-cta-button');

  if (!searchBtn || !dashboardLi || searchBtn.dataset.repositioned === 'true') {
    return;
  }

  const centerWrapper = searchBtn.parentElement;
  const list = dashboardLi.parentElement;

  if (!list || list.tagName !== 'UL') {
    return;
  }

  let slot = document.getElementById('search-bar-nav-slot');

  if (!slot) {
    slot = document.createElement('li');
    slot.id = 'search-bar-nav-slot';
    slot.className = 'hidden lg:flex items-center';
    list.insertBefore(slot, dashboardLi);
  }

  slot.appendChild(searchBtn);

  if (centerWrapper) {
    centerWrapper.id = 'navbar-search-center-slot';
    centerWrapper.style.display = 'none';
  }

  searchBtn.dataset.repositioned = 'true';
}

function initNavbarLayout() {
  repositionNavbarTabs();
  repositionNavbarSearch();

  if (
    document.querySelector('.nav-tabs')?.parentElement?.id !==
    'navbar-tabs-inline-slot'
  ) {
    window.setTimeout(repositionNavbarTabs, 50);
    window.setTimeout(repositionNavbarTabs, 250);
  }

  if (document.getElementById('search-bar-entry')?.dataset.repositioned !== 'true') {
    window.setTimeout(repositionNavbarSearch, 50);
    window.setTimeout(repositionNavbarSearch, 250);
  }
}

function handleNavbarMutation() {
  repositionNavbarTabs();
  repositionNavbarSearch();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbarLayout);
} else {
  initNavbarLayout();
}

new MutationObserver(handleNavbarMutation).observe(document.documentElement, {
  childList: true,
  subtree: true,
});