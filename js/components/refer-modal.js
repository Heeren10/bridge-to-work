
// Refer modal component
export function createReferModal(item, type, onClose) {
  const itemDetails = type === "job" 
    ? {
        title: item.title,
        organization: item.company,
        details: `${item.location} • ${item.salary}`
      }
    : {
        title: item.name,
        organization: "Support Service",
        details: item.address
      };

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  
  modalOverlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="text-lg font-semibold">Refer ${type === "job" ? "Opportunity" : "Service"}</h2>
        <button class="p-1 rounded-full hover:bg-muted transition-colors close-modal">
          <i data-lucide="x" size="18"></i>
        </button>
      </div>
      
      <div class="modal-content">
        <div class="mb-4">
          <h3 class="font-medium text-lg">${itemDetails.title}</h3>
          <p class="text-muted-foreground">${itemDetails.organization}</p>
          <p class="text-sm">${itemDetails.details}</p>
        </div>
        
        <div class="space-y-4">
          <button class="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium share-btn">
            Share
          </button>
          
          <button class="w-full py-2.5 border border-input rounded-lg font-medium hover:bg-muted/50 transition-colors copy-btn">
            Copy to Clipboard
          </button>
          
          <div class="modal-divider">
            <div class="modal-divider-text">
              <span>Or send via SMS</span>
            </div>
          </div>
          
          <form class="space-y-2 sms-form">
            <input
              type="tel"
              placeholder="Enter phone number"
              class="input-field w-full"
              required
            />
            <button
              type="submit"
              class="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Send SMS
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  // Close button functionality
  const closeButton = modalOverlay.querySelector('.close-modal');
  closeButton.addEventListener('click', () => {
    modalOverlay.remove();
    if (onClose) onClose();
  });
  
  // Close on click outside the modal
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
      if (onClose) onClose();
    }
  });
  
  // Share button functionality
  const shareButton = modalOverlay.querySelector('.share-btn');
  shareButton.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: `Bridge to Work - ${itemDetails.title}`,
        text: `Check out this opportunity with ${itemDetails.organization}: ${itemDetails.title}. ${itemDetails.details}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copy if Web Share API is not available
      copyToClipboard();
    }
  });
  
  // Copy button functionality
  const copyButton = modalOverlay.querySelector('.copy-btn');
  function copyToClipboard() {
    const text = `Bridge to Work - ${itemDetails.title} with ${itemDetails.organization}. ${itemDetails.details}`;
    navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy to Clipboard';
    }, 2000);
  }
  copyButton.addEventListener('click', copyToClipboard);
  
  // SMS form functionality
  const smsForm = modalOverlay.querySelector('.sms-form');
  smsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, this would connect to an SMS service
    const submitButton = smsForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sent!';
    setTimeout(() => {
      submitButton.textContent = 'Send SMS';
      smsForm.reset();
    }, 2000);
  });
  
  // Initialize Lucide icons
  setTimeout(() => {
    lucide.createIcons({
      icons: {
        X: lucide.X,
      },
      attrs: {
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      },
    });
  }, 0);
  
  return modalOverlay;
}
