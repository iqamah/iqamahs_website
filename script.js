// Masjid Data for Houston Area
const masjids = [
    {
        id: 1,
        name: "Islamic Society of Greater Houston",
        address: "3110 Eastside St, Houston, TX 77098",
        coordinates: [29.8141, -95.5847],
        distance: "2.3",
        prayerTimes: {
            fajr: "5:45 AM",
            dhuhr: "1:30 PM",
            asr: "4:45 PM",
            maghrib: "7:15 PM",
            isha: "8:45 PM"
        },
        jumuahTimes: ["12:30 PM", "1:30 PM", "2:30 PM"]
    },
    {
        id: 2,
        name: "Al-Noor Society of Houston",
        address: "16800 Imperial Valley Dr, Houston, TX 77060",
        coordinates: [29.7218, -95.6208],
        distance: "5.7",
        prayerTimes: {
            fajr: "5:50 AM",
            dhuhr: "1:35 PM",
            asr: "4:50 PM",
            maghrib: "7:20 PM",
            isha: "8:50 PM"
        },
        jumuahTimes: ["1:00 PM", "2:00 PM"]
    },
    {
        id: 3,
        name: "Bear Creek Islamic Center",
        address: "16401 Clay Rd, Houston, TX 77084",
        coordinates: [29.8536, -95.5281],
        distance: "8.1",
        prayerTimes: {
            fajr: "5:48 AM",
            dhuhr: "1:32 PM",
            asr: "4:48 PM",
            maghrib: "7:18 PM",
            isha: "8:48 PM"
        },
        jumuahTimes: ["1:15 PM", "2:00 PM", "2:45 PM"]
    }
];

// Prayer time icons
const prayerIcons = {
    fajr: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    dhuhr: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    asr: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    maghrib: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline></svg>',
    isha: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
};

// Initialize Map
let map;
let markers = [];
let selectedMasjidId = null;

function createMapInstance(elementId) {
    // Create map centered on Houston
    const mapInstance = L.map(elementId).setView([29.7604, -95.3698], 11);

    // Add tile layer (CartoDB Voyager)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
    }).addTo(mapInstance);

    return mapInstance;
}

function addMarkersToMap() {
    // Add custom markers for each masjid
    masjids.forEach(masjid => {
        // Create custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background: #2c5f2d;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
                <span style="transform: rotate(45deg); font-size: 20px;">🕌</span>
            </div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        // Create marker
        const marker = L.marker(masjid.coordinates, { icon: customIcon })
            .addTo(map);

        // Add click handler to center the map on the marker and highlight
        marker.on('click', function() {
            selectMasjid(masjid.id);
        });

        markers.push({ marker, masjidId: masjid.id });
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
        const group = L.featureGroup(markers.map(m => m.marker));
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

function initMap() {
    map = createMapInstance('map');
    addMarkersToMap();
}

// Geocode location (city or zip code) using Nominatim
async function searchLocation(query) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=us,ca&limit=1`
        );
        const data = await response.json();

        if (data && data.length > 0) {
            const location = data[0];
            const lat = parseFloat(location.lat);
            const lon = parseFloat(location.lon);

            // Center map on the searched location
            map.setView([lat, lon], 11, {
                animate: true,
                duration: 1
            });
        } else {
            alert('Location not found. Please try a different city or zip code.');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        alert('Error searching for location. Please try again.');
    }
}

// Select and highlight a masjid
function selectMasjid(masjidId) {
    selectedMasjidId = masjidId;

    // Find the masjid
    const masjid = masjids.find(m => m.id === masjidId);
    if (!masjid) return;

    // Center map on the masjid
    map.setView(masjid.coordinates, 14, {
        animate: true,
        duration: 0.5
    });

    // Highlight the selected card in the list
    document.querySelectorAll('.masjid-card').forEach(card => {
        card.classList.remove('selected');
    });

    const selectedCard = document.querySelector(`[data-masjid-id="${masjidId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        // Scroll the card into view
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Render Masjid List
function renderMasjidList() {
    const listContainer = document.getElementById('masjid-list');
    if (!listContainer) return;

    const html = masjids.map(masjid => `
        <div class="masjid-card" data-masjid-id="${masjid.id}" onclick="selectMasjid(${masjid.id})" style="cursor: pointer;">
            <div class="masjid-header">
                <div>
                    <h3 class="masjid-name">${masjid.name} <span class="masjid-distance">${masjid.distance}</span></h3>
                    <div class="masjid-address">📍 ${masjid.address}</div>
                </div>
            </div>
            <div class="prayer-times-compact">
                <div class="prayer-row">
                    <span class="prayer-item-compact">
                        ${prayerIcons.fajr} ${masjid.prayerTimes.fajr}
                    </span>
                    <span class="prayer-item-compact">
                        ${prayerIcons.dhuhr} ${masjid.prayerTimes.dhuhr}
                    </span>
                    <span class="prayer-item-compact">
                        ${prayerIcons.asr} ${masjid.prayerTimes.asr}
                    </span>
                    <span class="prayer-item-compact">
                        ${prayerIcons.maghrib} ${masjid.prayerTimes.maghrib}
                    </span>
                    <span class="prayer-item-compact">
                        ${prayerIcons.isha} ${masjid.prayerTimes.isha}
                    </span>
                </div>
                ${masjid.jumuahTimes && masjid.jumuahTimes.length > 0 ? `
                <div class="jumuah-row">
                    <strong>Jumuah:</strong> ${masjid.jumuahTimes.join(' • ')}
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    listContainer.innerHTML = html;
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('location-search');
    const searchBtn = document.getElementById('search-btn');

    // Search on button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchLocation(query);
        }
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchLocation(query);
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    renderMasjidList();
    setupSearch();
});
