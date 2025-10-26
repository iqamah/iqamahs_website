// Masjid Data for Houston Area
const masjids = [
    {
        id: 1,
        name: "Islamic Society of Greater Houston",
        address: "3110 Eastside St, Houston, TX 77098",
        coordinates: [29.8141, -95.5847],
        distance: "2.3 miles",
        prayerTimes: {
            fajr: "5:45 AM",
            dhuhr: "1:30 PM",
            asr: "4:45 PM",
            maghrib: "7:15 PM",
            isha: "8:45 PM"
        }
    },
    {
        id: 2,
        name: "Al-Noor Society of Houston",
        address: "16800 Imperial Valley Dr, Houston, TX 77060",
        coordinates: [29.7218, -95.6208],
        distance: "5.7 miles",
        prayerTimes: {
            fajr: "5:50 AM",
            dhuhr: "1:35 PM",
            asr: "4:50 PM",
            maghrib: "7:20 PM",
            isha: "8:50 PM"
        }
    },
    {
        id: 3,
        name: "Bear Creek Islamic Center",
        address: "16401 Clay Rd, Houston, TX 77084",
        coordinates: [29.8536, -95.5281],
        distance: "8.1 miles",
        prayerTimes: {
            fajr: "5:48 AM",
            dhuhr: "1:32 PM",
            asr: "4:48 PM",
            maghrib: "7:18 PM",
            isha: "8:48 PM"
        }
    }
];

// Initialize Map
let map;
let markers = [];

function initMap() {
    // Create map centered on Houston
    map = L.map('map').setView([29.7604, -95.3698], 11);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

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

        // Create popup content
        const popupContent = `
            <div class="popup-content">
                <div class="popup-title">${masjid.name}</div>
                <div class="popup-address">${masjid.address}</div>
                <span class="popup-distance">${masjid.distance}</span>
            </div>
        `;

        marker.bindPopup(popupContent);
        markers.push(marker);
    });

    // Fit bounds to show all markers
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

// Render Masjid List
function renderMasjidList() {
    const listContainer = document.getElementById('masjid-list');

    const html = masjids.map(masjid => `
        <div class="masjid-card">
            <div class="masjid-header">
                <div class="masjid-icon">🕌</div>
                <div class="masjid-info">
                    <h3 class="masjid-name">${masjid.name}</h3>
                    <div class="masjid-address">
                        📍 ${masjid.address}
                    </div>
                    <span class="masjid-distance">${masjid.distance}</span>
                </div>
            </div>
            <div class="prayer-times">
                <h4>Today's Iqamah Times</h4>
                <div class="prayer-grid">
                    <div class="prayer-item">
                        <span class="prayer-name">Fajr</span>
                        <span class="prayer-time">${masjid.prayerTimes.fajr}</span>
                    </div>
                    <div class="prayer-item">
                        <span class="prayer-name">Dhuhr</span>
                        <span class="prayer-time">${masjid.prayerTimes.dhuhr}</span>
                    </div>
                    <div class="prayer-item">
                        <span class="prayer-name">Asr</span>
                        <span class="prayer-time">${masjid.prayerTimes.asr}</span>
                    </div>
                    <div class="prayer-item">
                        <span class="prayer-name">Maghrib</span>
                        <span class="prayer-time">${masjid.prayerTimes.maghrib}</span>
                    </div>
                    <div class="prayer-item">
                        <span class="prayer-name">Isha</span>
                        <span class="prayer-time">${masjid.prayerTimes.isha}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    listContainer.innerHTML = html;
}

// View Toggle Functionality
function setupViewToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const views = document.querySelectorAll('.view');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const viewType = button.getAttribute('data-view');

            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update active view
            views.forEach(view => view.classList.remove('active'));
            document.getElementById(`${viewType}-view`).classList.add('active');

            // Invalidate map size when switching to map view
            if (viewType === 'map') {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    renderMasjidList();
    setupViewToggle();
});
