
// Job card component
export function createJobCard(job, onRefer) {
  const jobCard = document.createElement('div');
  jobCard.className = 'glass-card rounded-xl overflow-hidden card-hover transition-all duration-300 border-l-4 border-l-primary job-card';
  
  // Format salary to always use ₹ symbol
  const formattedSalary = job.salary.startsWith('₹') ? job.salary : `₹${job.salary.replace(/[^\d]/g, '')}`;
  
  jobCard.innerHTML = `
    <div class="p-4">
      <div class="job-card-header">
        <div class="job-title-container">
          <div class="job-icon">
            <i data-lucide="briefcase" size="16" class="text-white"></i>
          </div>
          <h3 class="font-semibold text-lg">${job.title}</h3>
        </div>
        <div class="job-date-tag">
          <i data-lucide="calendar" size="12"></i>
          <span class="text-xs font-medium">${job.date}</span>
        </div>
      </div>
      <p class="text-sm text-muted-foreground mt-1 ml-10">${job.company}</p>
      
      <div class="job-meta-grid">
        <div class="job-meta-item">
          <i data-lucide="map-pin" size="14" class="text-rose-500"></i>
          <span>${job.location}</span>
        </div>
        <div class="job-meta-item">
          <i data-lucide="clock" size="14" class="text-blue-500"></i>
          <span>${job.duration}</span>
        </div>
        <div class="job-meta-item" style="font-weight: 500; color: #15803d;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 3h12"></path>
            <path d="M6 8h12"></path>
            <path d="m6 13 8.5 8"></path>
            <path d="M6 13h3"></path>
            <path d="M9 13c6.667 0 6.667-10 0-10"></path>
          </svg>
          <span>${formattedSalary}</span>
        </div>
      </div>

      <div class="job-details" style="display: none;">
        <div class="mt-4 animate-fade-in">
          <p class="text-sm mb-3">${job.description}</p>
          <div class="job-skills">
            ${job.skills.map(skill => `
              <span class="skill-tag">
                ${skill}
              </span>
            `).join('')}
          </div>
          ${onRefer ? `
            <button class="refer-button">
              Refer This Opportunity
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Add click functionality to expand/collapse
  jobCard.addEventListener('click', (e) => {
    const detailsElement = jobCard.querySelector('.job-details');
    const isExpanded = detailsElement.style.display !== 'none';
    
    detailsElement.style.display = isExpanded ? 'none' : 'block';
  });
  
  // Add refer button functionality if provided
  if (onRefer) {
    const referButton = jobCard.querySelector('.refer-button');
    referButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the card from collapsing
      onRefer(job);
    });
  }
  
  return jobCard;
}
