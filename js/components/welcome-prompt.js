
// Welcome prompt component
export function createWelcomePrompt(message = "Say no to cash - Help create sustainable change through opportunities") {
  const welcomePrompt = document.createElement('div');
  welcomePrompt.className = 'welcome-prompt';
  
  welcomePrompt.innerHTML = `
    <div class="welcome-prompt-bg"></div>
    <button class="welcome-prompt-close" aria-label="Close prompt">
      <i data-lucide="x" size="16"></i>
    </button>
    <div class="welcome-prompt-content">
      <div class="welcome-prompt-icon">
        <i data-lucide="info" size="18" class="text-primary animate-pulse-subtle"></i>
      </div>
      <div>
        <p class="pr-6 text-sm font-medium">${message}</p>
        <p class="text-xs text-muted-foreground mt-1">Together we can create pathways to independence</p>
      </div>
    </div>
  `;
  
  // Add close button functionality
  const closeButton = welcomePrompt.querySelector('.welcome-prompt-close');
  closeButton.addEventListener('click', () => {
    welcomePrompt.style.display = 'none';
    // In a real app, we would update appContext.promptShown here
  });
  
  return welcomePrompt;
}
