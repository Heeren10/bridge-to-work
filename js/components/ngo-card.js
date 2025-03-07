
// NGO card component
export function createNGOCard(ngo, onRefer) {
  const ngoCard = document.createElement('div');
  ngoCard.className = 'glass-card rounded-xl overflow-hidden card-hover ngo-card';
  
  ngoCard.innerHTML = `
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-lg">${ngo.name}</h3>
      </div>
      
      <div class="flex flex-col gap-2 mt-3">
        <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
          <i data-lucide="map-pin" size="14"></i>
          <span>${ngo.address}</span>
        </div>
        <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
          <i data-lucide="phone" size="14"></i>
          <span>${ngo.phone}</span>
        </div>
      </div>

      <div class="ngo-details" style="display: none;">
        <div class="mt-4 animate-fade-in">
          <p class="text-sm mb-3">${ngo.description}</p>
          <p class="text-sm text-muted-foreground mb-2">Hours: ${ngo.hours}</p>
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${ngo.services.map(service => `
              <span class="px-2 py-0.5 bg-accent text-xs rounded-full">
                ${service}
              </span>
            `).join('')}
          </div>
          <div class="flex gap-2 mt-3">
            ${ngo.website ? `
              <a 
                href="${ngo.website}"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <i data-lucide="external-link" size="14"></i>
                <span>Visit Website</span>
              </a>
            ` : ''}
            ${onRefer ? `
              <button 
                class="ml-auto py-1.5 px-3 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors ngo-refer-btn"
              >
                Refer
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add click functionality to expand/collapse
  ngoCard.addEventListener('click', (e) => {
    const detailsElement = ngoCard.querySelector('.ngo-details');
    const isExpanded = detailsElement.style.display !== 'none';
    
    detailsElement.style.display = isExpanded ? 'none' : 'block';
  });
  
  // Add refer button functionality if provided
  if (onRefer) {
    const referButton = ngoCard.querySelector('.ngo-refer-btn');
    referButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the card from collapsing
      onRefer(ngo);
    });
  }
  
  return ngoCard;
}
