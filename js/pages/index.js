
// Home/Index page
export function renderHomePage(appContext) {
  const app = document.getElementById('app');
  
  // Create page structure
  const pageContainer = document.createElement('div');
  pageContainer.className = 'min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white';
  
  // Background gradients
  pageContainer.innerHTML += `
    <div class="absolute top-0 right-0 w-full h-64 bg-gradient-to-r from-blue-100/30 to-purple-100/30 -z-10 rounded-b-[50%]"></div>
    <div class="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-r from-amber-50/40 to-rose-50/40 -z-10 rounded-t-[30%]"></div>
  `;
  
  // Main content
  const main = document.createElement('main');
  main.className = 'flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10';
  
  const content = document.createElement('div');
  content.className = 'w-full max-w-md mx-auto';
  
  // Hero section
  const hero = document.createElement('div');
  hero.className = 'text-center mb-8 animate-slide-in';
  hero.innerHTML = `
    <div class="inline-block p-3 mb-4 bg-gradient-to-br from-primary/10 to-blue-400/20 rounded-full">
      <i data-lucide="briefcase" size="32" class="text-primary animate-pulse-subtle"></i>
    </div>
    <h1 class="text-4xl font-bold mb-3 text-balance bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
      Bridge to Work
    </h1>
    <p class="text-muted-foreground text-balance text-lg">
      Connecting opportunities with those who need them most
    </p>
  `;
  
  // Showcase section
  const showcase = document.createElement('div');
  showcase.className = 'relative h-[340px] mb-10 showcase-container';
  
  const showcaseItems = [
    {
      title: "Find Work",
      description: "Access nearby job opportunities that match your skills and availability. Get connected to meaningful employment with dignity.",
      icon: '<i data-lucide="briefcase" class="h-10 w-10 text-blue-500"></i>',
      color: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100"
    },
    {
      title: "Get Help",
      description: "Discover local resources, shelters, and support services to assist you. Connect with NGOs and government programs offering assistance.",
      icon: '<i data-lucide="heart" class="h-10 w-10 text-rose-500"></i>',
      color: "from-rose-50 to-rose-100",
      iconBg: "bg-rose-100"
    },
    {
      title: "Build a Future",
      description: "Create sustainable pathways to independence through work, training, and community support. Your journey to self-reliance starts here.",
      icon: '<i data-lucide="building" class="h-10 w-10 text-amber-500"></i>',
      color: "from-amber-50 to-amber-100",
      iconBg: "bg-amber-100"
    }
  ];
  
  showcaseItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `showcase-card bg-gradient-to-br ${item.color} border border-white/80 ${index === 0 ? '' : 'inactive'}`;
    
    card.innerHTML = `
      <div class="${item.iconBg} p-4 rounded-full showcase-icon">
        ${item.icon}
      </div>
      <h2 class="showcase-title">${item.title}</h2>
      <p class="showcase-description">
        ${item.description}
      </p>
      <div class="showcase-footer">
        <i data-lucide="map-pin" size="18" class="text-rose-500"></i>
        <span class="text-sm text-gray-600">Location-based services</span>
      </div>
    `;
    
    showcase.appendChild(card);
  });
  
  // Dot indicators
  const dotIndicators = document.createElement('div');
  dotIndicators.className = 'dot-indicators';
  
  let activeIndex = 0;
  
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('button');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `View section ${i + 1}`);
    
    // Add click event to switch between showcase items
    dot.addEventListener('click', () => {
      // Update active dot
      const dots = dotIndicators.querySelectorAll('.dot');
      dots.forEach((d, index) => {
        d.classList.toggle('active', index === i);
      });
      
      // Update active showcase card
      const cards = showcase.querySelectorAll('.showcase-card');
      cards.forEach((card, index) => {
        card.classList.toggle('inactive', index !== i);
      });
      
      // Update active index
      activeIndex = i;
    });
    
    dotIndicators.appendChild(dot);
  }
  
  // Auto-advance showcase
  let showcaseInterval = setInterval(() => {
    activeIndex = (activeIndex + 1) % 3;
    
    // Update dots
    const dots = dotIndicators.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
    
    // Update cards
    const cards = showcase.querySelectorAll('.showcase-card');
    cards.forEach((card, index) => {
      card.classList.toggle('inactive', index !== activeIndex);
    });
  }, 3000);
  
  // CTA section
  const cta = document.createElement('div');
  cta.className = 'cta-container';
  
  const getStartedButton = document.createElement('button');
  getStartedButton.className = 'btn-primary w-full flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-primary to-blue-600';
  getStartedButton.innerHTML = `
    <span>Get Started</span>
    <i data-lucide="arrow-right" size="18"></i>
  `;
  
  getStartedButton.addEventListener('click', () => {
    // Reset promptShown to false so it appears on the select-type page
    appContext.setPromptShown(false);
    router.navigate('/select-type');
    
    // Clear the interval when navigating away
    clearInterval(showcaseInterval);
  });
  
  cta.appendChild(getStartedButton);
  
  // User type grid
  const userTypeGrid = document.createElement('div');
  userTypeGrid.className = 'user-types-grid';
  
  const userTypes = [
    {
      icon: '<i data-lucide="user" size="18" class="text-blue-500 mb-1"></i>',
      text: 'For Individuals',
      bgColor: 'from-blue-50 to-blue-100/50',
      borderColor: 'border-blue-100'
    },
    {
      icon: '<i data-lucide="building" size="18" class="text-amber-500 mb-1"></i>',
      text: 'For Organizations',
      bgColor: 'from-amber-50 to-amber-100/50',
      borderColor: 'border-amber-100'
    },
    {
      icon: '<i data-lucide="heart" size="18" class="text-green-500 mb-1"></i>',
      text: 'For Donors',
      bgColor: 'from-green-50 to-green-100/50',
      borderColor: 'border-green-100'
    }
  ];
  
  userTypes.forEach(type => {
    const typeItem = document.createElement('div');
    typeItem.className = `user-type-item bg-gradient-to-br ${type.bgColor} border ${type.borderColor}`;
    typeItem.innerHTML = `
      <div class="user-type-item-icon">${type.icon}</div>
      <span class="user-type-item-text">${type.text}</span>
    `;
    userTypeGrid.appendChild(typeItem);
  });
  
  cta.appendChild(userTypeGrid);
  
  // Assemble the content
  content.appendChild(hero);
  content.appendChild(showcase);
  content.appendChild(dotIndicators);
  content.appendChild(cta);
  main.appendChild(content);
  
  // Footer
  const footer = document.createElement('footer');
  footer.className = 'py-6 text-center text-sm text-muted-foreground bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm border-t border-blue-100/30';
  footer.innerHTML = `
    <div class="max-w-4xl mx-auto px-4">
      <p class="mb-2">© 2023 Bridge to Work - Creating pathways to dignity and independence</p>
      <div class="footer-links">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Contact Us</span>
        <span>About</span>
      </div>
    </div>
  `;
  
  // Assemble the page
  pageContainer.appendChild(main);
  pageContainer.appendChild(footer);
  app.appendChild(pageContainer);
  
  // Initialize Lucide icons
  lucide.createIcons();
}
