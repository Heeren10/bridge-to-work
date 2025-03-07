
// Select Type page
import { createHeader } from '../components/header.js';
import { createBackButton } from '../components/back-button.js';
import { createWelcomePrompt } from '../components/welcome-prompt.js';
import { createUserTypeCard } from '../components/user-type-card.js';

export function renderSelectTypePage(appContext) {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Clear previous content
  
  // Create page container
  const pageContainer = document.createElement('div');
  pageContainer.className = 'min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white';
  
  // Add background gradients
  pageContainer.innerHTML = `
    <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 -z-10"></div>
  `;
  
  // Add header
  const header = createHeader("Select User Type");
  pageContainer.appendChild(header);
  
  // Main content
  const main = document.createElement('main');
  main.className = 'flex-1 container-padding max-w-screen-lg mx-auto';
  
  // Back button
  const backButtonContainer = document.createElement('div');
  backButtonContainer.className = 'mb-6';
  backButtonContainer.appendChild(createBackButton('/'));
  main.appendChild(backButtonContainer);
  
  // Welcome prompt
  if (appContext.promptShown === false) {
    main.appendChild(createWelcomePrompt());
  }
  
  // Page title
  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-gradient-primary';
  title.textContent = 'Find Your Path';
  main.appendChild(title);
  
  // Page description
  const description = document.createElement('p');
  description.className = 'text-lg text-muted-foreground mb-8 max-w-3xl';
  description.textContent = 'Bridge to Work connects people to opportunities and resources. Select your role below to get started on your journey.';
  main.appendChild(description);
  
  // User type grid
  const userTypeGrid = document.createElement('div');
  userTypeGrid.className = 'user-type-grid';
  
  // Define user types
  const userTypes = [
    {
      icon: '<i data-lucide="user" class="h-6 w-6 text-blue-500"></i>',
      title: "Normal Person",
      description: "Find and refer people to job opportunities and support services",
      features: [
        "Find nearby job opportunities",
        "Connect with support services",
        "Refer friends to opportunities"
      ],
      color: "border-l-blue-400",
      path: "/normal-person"
    },
    {
      icon: '<i data-lucide="briefcase" class="h-6 w-6 text-amber-500"></i>',
      title: "Recruiter",
      description: "Post job opportunities and find potential workers",
      features: [
        "Post new job listings",
        "Review applications",
        "Connect with candidates"
      ],
      color: "border-l-amber-400",
      path: "/recruiter"
    },
    {
      icon: '<i data-lucide="building" class="h-6 w-6 text-green-500"></i>',
      title: "Service Manager",
      description: "Manage your shelter, NGO or support service",
      features: [
        "List your services",
        "Manage availability",
        "Connect with those in need"
      ],
      color: "border-l-green-400",
      path: "/service-manager"
    },
    {
      icon: '<i data-lucide="heart" class="h-6 w-6 text-rose-500"></i>',
      title: "Direct Donate",
      description: "Support organizations helping people in need",
      features: [
        "Make secure donations",
        "Choose your cause",
        "Track your impact"
      ],
      color: "border-l-rose-400",
      path: "/direct-donate"
    }
  ];
  
  // Add user type cards to the grid
  userTypes.forEach(userType => {
    const card = createUserTypeCard({
      icon: userType.icon,
      title: userType.title,
      description: userType.description,
      features: userType.features,
      color: userType.color,
      onClick: () => router.navigate(userType.path)
    });
    
    userTypeGrid.appendChild(card);
  });
  
  main.appendChild(userTypeGrid);
  
  // Features section
  const featuresSection = document.createElement('div');
  featuresSection.className = 'mt-16 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100';
  
  featuresSection.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">How Bridge to Work Makes a Difference</h2>
    <div class="features-grid">
      <div class="feature-item">
        <div class="p-2 bg-blue-100 rounded-full mr-3 feature-icon">
          <i data-lucide="map-pin" size="20" class="text-blue-600"></i>
        </div>
        <div>
          <h3 class="font-medium mb-1">Local Focus</h3>
          <p class="text-sm text-gray-600">All opportunities and services are mapped to your location</p>
        </div>
      </div>
      
      <div class="feature-item">
        <div class="p-2 bg-amber-100 rounded-full mr-3 feature-icon">
          <i data-lucide="calendar" size="20" class="text-amber-600"></i>
        </div>
        <div>
          <h3 class="font-medium mb-1">Immediate Help</h3>
          <p class="text-sm text-gray-600">Same-day opportunities and emergency services</p>
        </div>
      </div>
      
      <div class="feature-item">
        <div class="p-2 bg-green-100 rounded-full mr-3 feature-icon">
          <i data-lucide="dollar-sign" size="20" class="text-green-600"></i>
        </div>
        <div>
          <h3 class="font-medium mb-1">Dignity First</h3>
          <p class="text-sm text-gray-600">Creating independence through meaningful work</p>
        </div>
      </div>
    </div>
  `;
  
  main.appendChild(featuresSection);
  
  // Add main content to page
  pageContainer.appendChild(main);
  app.appendChild(pageContainer);
  
  // Initialize Lucide icons
  lucide.createIcons();
}
