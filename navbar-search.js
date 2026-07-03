function findNavbarTabsCenterSlot() {
  const navbarRow = document.querySelector(
    '#navbar .h-16 .h-full.relative.flex-1',
  );

  return navbarRow?.querySelector(':scope > .hidden.lg\\:flex.justify-center') ?? null;
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
    document.getElementById('navbar-tabs-center-slot') ||
    findNavbarTabsCenterSlot();

  if (!slot) {
    return;
  }

  if (!document.getElementById('navbar-tabs-row')) {
    const tabsRow = navTabs.closest('.hidden.lg\\:flex.px-12');

    if (tabsRow) {
      tabsRow.id = 'navbar-tabs-row';
    }
  }

  const logoSlot = document.getElementById('navbar-tabs-inline-slot');

  if (logoSlot && logoSlot !== slot) {
    logoSlot.removeAttribute('id');
  }

  slot.id = 'navbar-tabs-center-slot';
  slot.style.display = 'flex';

  if (navTabs.parentElement !== slot) {
    slot.appendChild(navTabs);
  }

  hideNavbarTabsRow();
  document.documentElement.dataset.navbarTabsInline = 'true';
  markNavbarLayoutReady();
}

function repositionNavbarSearch() {
  const searchBtn = document.getElementById('search-bar-entry');
  const dashboardLi = document.getElementById('topbar-cta-button');

  if (!searchBtn || !dashboardLi || searchBtn.dataset.repositioned === 'true') {
    return;
  }

  const centerWrapper = searchBtn.closest('.hidden.lg\\:flex.justify-center');
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

  if (centerWrapper && centerWrapper.id !== 'navbar-tabs-center-slot') {
    centerWrapper.id = 'navbar-search-center-slot';
    centerWrapper.style.display = 'none';
  }

  searchBtn.dataset.repositioned = 'true';
  markNavbarLayoutReady();
}

function isNavbarLayoutReady() {
  const tabsReady =
    document.querySelector('.nav-tabs')?.parentElement?.id ===
    'navbar-tabs-center-slot';
  const searchBtn = document.getElementById('search-bar-entry');
  const searchReady =
    !searchBtn || searchBtn.dataset.repositioned === 'true';

  return tabsReady && searchReady;
}

function markNavbarLayoutReady() {
  if (isNavbarLayoutReady()) {
    document.documentElement.dataset.navbarLayoutReady = 'true';
  }
}

let navbarLayoutRetries = 0;
const NAVBAR_LAYOUT_MAX_RETRIES = 20;

function initNavbarLayout() {
  repositionNavbarSearch();
  repositionNavbarTabs();
  markNavbarLayoutReady();

  if (!isNavbarLayoutReady() && navbarLayoutRetries < NAVBAR_LAYOUT_MAX_RETRIES) {
    navbarLayoutRetries += 1;
    window.requestAnimationFrame(initNavbarLayout);
    return;
  }

  if (!isNavbarLayoutReady()) {
    document.documentElement.dataset.navbarLayoutReady = 'true';
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