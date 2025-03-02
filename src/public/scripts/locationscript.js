// Initial map configuration
const initialLocation = { lat: 32.672000, lng: 74.844000 };
const map = L.map('map').setView([initialLocation.lat, initialLocation.lng], 16);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const userIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Add marker at the initial location
const userMarker = L.marker([initialLocation.lat, initialLocation.lng], { icon: userIcon }).addTo(map);
userMarker.bindPopup("<b>user</b>").openPopup();

// Define new map bounds
const bounds = [
    [29.860955, 77.886585],  
    [29.873348, 77.901510]   
];


L.rectangle(bounds, { color: 'blue', weight: 1 }).addTo(map);
map.fitBounds(bounds);

// Restrict map view to the defined bounds
map.setMaxBounds(bounds);

// Restrict zooming levels
map.options.minZoom = 15;
map.options.maxZoom = 18;

// Status element and button
const statusElement = document.getElementById('status');
const updateButton = document.getElementById('update-button');

// Function to update location
function updateLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Check if location is within bounds
            if (latitude >= bounds[0][0] && latitude <= bounds[1][0] &&
                longitude >= bounds[0][1] && longitude <= bounds[1][1]) {

                // Update marker position
                userMarker.setLatLng([latitude, longitude]);
                map.setView([latitude, longitude], 16);

                // Update status
                statusElement.textContent = 'Location updated successfully!';
                statusElement.className = 'success';

                // Send updated location to the server
                fetch('/main/location', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ latitude, longitude })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Location update successful:', data);
                    } else {
                        throw new Error('Failed to update location on server.');
                    }
                })
                // .catch(error => {
                //     console.error('Error:', error);
                //     statusElement.textContent = `Error: ${error.message}`;
                //     statusElement.className = 'error';
                // });
            } else {
                statusElement.textContent = 'New location is outside the allowed area.';
                statusElement.className = 'error';
            }
        }, function (error) {
            statusElement.textContent = `Error: ${error.message}`;
            statusElement.className = 'error';
            console.error('Geolocation error:', error);
        });
    } else {
        statusElement.textContent = 'Geolocation is not supported by this browser.';
        statusElement.className = 'error';
    }
}

// Initial update and periodic updates
updateLocation();
setInterval(updateLocation, 30 * 60 * 1000);

// Add event listener for manual updates
//updateButton.addEventListener('click', updateLocation);
