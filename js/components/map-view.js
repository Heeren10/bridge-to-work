
// Map view component - Simplified version of the React component
export function createMapView(jobs, ngos, activeType = 'jobs') {
  const mapContainer = document.createElement('div');
  mapContainer.className = 'map-container';
  mapContainer.id = 'map';
  
  // Create a placeholder for the map since we're not implementing a real map in this example
  mapContainer.innerHTML = `
    <div class="map-placeholder">
      <i data-lucide="map" size="48" class="text-gray-400"></i>
      <p class="map-placeholder-text">Interactive map would display locations here</p>
    </div>
  `;
  
  // In a real implementation, we would initialize a map library here
  // For example, with Leaflet or Google Maps
  
  // Function to add map pins for jobs and NGOs
  function renderMapPins() {
    // Clear existing pins
    const existingPins = mapContainer.querySelectorAll('.map-pin');
    existingPins.forEach(pin => pin.remove());
    
    // Sample positions for demonstration
    const positions = [
      { top: '20%', left: '30%' },
      { top: '40%', left: '50%' },
      { top: '60%', left: '70%' },
      { top: '30%', left: '70%' },
      { top: '50%', left: '30%' },
      { top: '70%', left: '50%' }
    ];
    
    // Display job pins if jobs tab is active
    if (activeType === 'jobs') {
      jobs.forEach((job, index) => {
        const position = positions[index % positions.length];
        const pin = document.createElement('div');
        pin.className = 'map-pin map-pin-job';
        pin.style.top = position.top;
        pin.style.left = position.left;
        pin.innerHTML = `
          <i data-lucide="briefcase" size="14" class="text-white"></i>
          <div class="map-pin-tooltip">${job.title} - ${job.location}</div>
        `;
        mapContainer.appendChild(pin);
      });
    }
    
    // Display NGO pins if services tab is active
    if (activeType === 'services') {
      ngos.forEach((ngo, index) => {
        const position = positions[index % positions.length];
        const pin = document.createElement('div');
        pin.className = 'map-pin map-pin-ngo';
        pin.style.top = position.top;
        pin.style.left = position.left;
        pin.innerHTML = `
          <i data-lucide="building" size="14" class="text-white"></i>
          <div class="map-pin-tooltip">${ngo.name} - ${ngo.address}</div>
        `;
        mapContainer.appendChild(pin);
      });
    }
  }
  
  // Initialize pins
  setTimeout(() => {
    renderMapPins();
    // Re-initialize Lucide icons for the newly added pins
    lucide.createIcons();
  }, 100);
  
  // Method to update the map when data or active type changes
  mapContainer.updateMap = function(newJobs, newNgos, newActiveType) {
    jobs = newJobs || jobs;
    ngos = newNgos || ngos;
    activeType = newActiveType || activeType;
    
    setTimeout(() => {
      renderMapPins();
      lucide.createIcons();
    }, 100);
  };
  
  return mapContainer;
}
