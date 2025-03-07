
// Search and filter component
export function createSearchFilter({ onSearch, onFilter, filterOptions = [
  { id: "jobs", label: "Jobs" },
  { id: "ngos", label: "NGOs" },
  { id: "shelters", label: "Shelters" },
  { id: "training", label: "Training" }
]}) {
  const container = document.createElement('div');
  container.className = 'w-full space-y-4';
  
  // Create initial filter state
  const filterState = {};
  filterOptions.forEach(option => {
    filterState[option.id] = false;
  });
  
  container.innerHTML = `
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <input
          type="text"
          placeholder="Search opportunities..."
          class="input-field w-full pl-10 pr-10"
        />
        <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" size="18"></i>
        <button 
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground clear-search"
          style="display: none;"
        >
          <i data-lucide="x" size="16"></i>
        </button>
      </div>
      <button 
        class="p-3 rounded-lg border border-border filter-toggle"
        aria-label="Filter"
      >
        <i data-lucide="filter" size="20" class="text-muted-foreground"></i>
      </button>
    </div>

    <div class="filter-options" style="display: none;">
      <div class="flex flex-wrap gap-2 p-3 bg-accent rounded-lg animate-fade-in">
        ${filterOptions.map(option => `
          <button
            data-filter="${option.id}"
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-white border border-border hover:bg-secondary filter-option"
          >
            ${option.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  
  // Add search functionality
  const searchInput = container.querySelector('input');
  const clearSearchBtn = container.querySelector('.clear-search');
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    
    // Show/hide clear button
    clearSearchBtn.style.display = query ? 'block' : 'none';
    
    // Call the search callback
    if (onSearch) {
      onSearch(query);
    }
  });
  
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    
    // Call the search callback with empty query
    if (onSearch) {
      onSearch('');
    }
  });
  
  // Add filter functionality
  const filterToggle = container.querySelector('.filter-toggle');
  const filterOptions = container.querySelector('.filter-options');
  const filterButtons = container.querySelectorAll('.filter-option');
  
  filterToggle.addEventListener('click', () => {
    const isOpen = filterOptions.style.display !== 'none';
    filterOptions.style.display = isOpen ? 'none' : 'block';
    
    // Update the toggle button style
    if (isOpen) {
      filterToggle.classList.remove('bg-accent', 'border-primary/30');
      filterToggle.querySelector('i').classList.remove('text-primary');
      filterToggle.querySelector('i').classList.add('text-muted-foreground');
    } else {
      filterToggle.classList.add('bg-accent', 'border-primary/30');
      filterToggle.querySelector('i').classList.remove('text-muted-foreground');
      filterToggle.querySelector('i').classList.add('text-primary');
    }
  });
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterId = button.dataset.filter;
      
      // Toggle filter state
      filterState[filterId] = !filterState[filterId];
      
      // Update button style
      if (filterState[filterId]) {
        button.classList.remove('bg-white', 'border-border', 'hover:bg-secondary');
        button.classList.add('bg-primary', 'text-primary-foreground');
      } else {
        button.classList.add('bg-white', 'border-border', 'hover:bg-secondary');
        button.classList.remove('bg-primary', 'text-primary-foreground');
      }
      
      // Call the filter callback
      if (onFilter) {
        onFilter(filterState);
      }
    });
  });
  
  return container;
}
