
// Back button component
export function createBackButton(to) {
  const button = document.createElement('button');
  button.className = 'back-button';
  button.setAttribute('aria-label', 'Back');
  
  button.innerHTML = `
    <i data-lucide="arrow-left" size="18"></i>
    <span>Back</span>
  `;
  
  button.addEventListener('click', () => {
    if (to) {
      window.router.navigate(to);
    } else {
      window.history.back();
    }
  });
  
  return button;
}
