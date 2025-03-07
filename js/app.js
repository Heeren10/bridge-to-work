
// Import necessary modules
import { router } from './router.js';
import { renderHomePage } from './pages/index.js';
import { renderSelectTypePage } from './pages/select-type.js';
import { renderNormalPersonPage } from './pages/normal-person.js';
import { renderRecruiterPage } from './pages/recruiter.js';
import { renderServiceManagerPage } from './pages/service-manager.js';
import { renderDirectDonatePage } from './pages/direct-donate.js';
import { renderNotFoundPage } from './pages/not-found.js';

// App context for global state
const appContext = {
  promptShown: false,
  setPromptShown: function(shown) {
    this.promptShown = shown;
    // We might need to update some UI based on this state
    const welcomePrompt = document.querySelector('.welcome-prompt');
    if (welcomePrompt) {
      if (shown) {
        welcomePrompt.style.display = 'none';
      } else {
        welcomePrompt.style.display = 'block';
      }
    }
  }
};

// Initialize router
router.init(appContext);

// Register routes
router.registerRoute('/', renderHomePage);
router.registerRoute('/select-type', renderSelectTypePage);
router.registerRoute('/normal-person', renderNormalPersonPage);
router.registerRoute('/recruiter', renderRecruiterPage);
router.registerRoute('/service-manager', renderServiceManagerPage);
router.registerRoute('/direct-donate', renderDirectDonatePage);
router.registerRoute('*', renderNotFoundPage); // Catch-all route

// Initialize Lucide icons once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Navigate to the initial route
router.navigateToCurrentRoute();
