
// User type card component
export function createUserTypeCard({ icon, title, description, features, color, onClick }) {
  const card = document.createElement('div');
  card.className = `glass-card rounded-xl p-6 cursor-pointer card-hover transition-all duration-300 hover:scale-[1.02] border-l-4 ${color} overflow-hidden relative user-type-card`;
  
  card.innerHTML = `
    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10"></div>
    
    <div class="flex flex-col items-center text-center space-y-4">
      <div class="p-3 ${color.replace('border-l-', 'bg-')} bg-opacity-20 rounded-full">
        ${icon}
      </div>
      <h2 class="text-lg font-semibold">${title}</h2>
      <p class="text-sm text-muted-foreground">${description}</p>
      
      <div class="space-y-2 w-full mt-2">
        ${features.map(feature => `
          <div class="flex items-center text-sm">
            <i data-lucide="check-circle" size="14" class="text-green-500 mr-2 flex-shrink-0"></i>
            <span class="text-left text-gray-600">${feature}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="flex items-center mt-4 text-primary text-sm font-medium">
        <span>Continue</span>
        <i data-lucide="arrow-right" size="16" class="ml-2"></i>
      </div>
    </div>
  `;
  
  card.addEventListener('click', onClick);
  
  return card;
}
