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
}

function initNavbarLayout() {
  repositionNavbarSearch();
  repositionNavbarTabs();

  const tabsReady =
    document.querySelector('.nav-tabs')?.parentElement?.id ===
    'navbar-tabs-center-slot';
  const searchReady =
    document.getElementById('search-bar-entry')?.dataset.repositioned === 'true';

  if (!tabsReady || !searchReady) {
    window.setTimeout(initNavbarLayout, 50);
    window.setTimeout(initNavbarLayout, 250);
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