
// Header component
export function createHeader(title = "Bridge to Work", showHome = true) {
  const header = document.createElement('header');
  header.className = 'header';

  const headerContent = document.createElement('div');
  headerContent.className = 'header-content';

  const titleElement = document.createElement('h1');
  titleElement.className = 'text-lg font-semibold';
  titleElement.textContent = title;

  headerContent.appendChild(titleElement);

  if (showHome) {
    const homeButton = document.createElement('button');
    homeButton.className = 'p-2 rounded-full hover:bg-accent transition-colors';
    homeButton.setAttribute('aria-label', 'Home');
    homeButton.innerHTML = '<i data-lucide="home"></i>';
    homeButton.addEventListener('click', () => {
      window.router.navigate('/');
    });

    headerContent.appendChild(homeButton);
  }

  header.appendChild(headerContent);
  return header;
}
