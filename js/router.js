
// Simple router implementation for vanilla JS
export const router = {
  routes: {},
  currentPath: '/',
  appContext: null,

  init(appContext) {
    this.appContext = appContext;
    
    // Listen for popstate events (back/forward browser navigation)
    window.addEventListener('popstate', (e) => {
      this.navigateToCurrentRoute();
    });

    // Intercept clicks on links to use the router
    document.addEventListener('click', (e) => {
      // Find closest anchor tag if the click is on a child element
      const link = e.target.closest('a');
      if (!link) return;
      
      // Only handle links that should be routed internally
      if (link.target === '_blank' || link.hasAttribute('download') || link.getAttribute('rel') === 'external') {
        return;
      }

      // Get the href and check if it's an internal link
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Prevent default link behavior
      e.preventDefault();
      
      // Navigate to the new route
      this.navigate(href);
    });
  },

  registerRoute(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    // Update browser history and URL
    window.history.pushState({}, '', path);
    this.navigateToCurrentRoute();
  },

  navigateToCurrentRoute() {
    const path = window.location.pathname;
    this.currentPath = path;
    
    // Clear current content
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';

    // Find the route handler
    const routeHandler = this.routes[path] || this.routes['*']; // Fallback to 404
    
    if (routeHandler) {
      routeHandler(this.appContext);
    } else {
      console.error(`No handler found for route: ${path}`);
    }
  }
};
