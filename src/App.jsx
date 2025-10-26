import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import ListView from './components/ListView';
import { masjids } from './data/masjids';
import { calculateDistance, formatDistance } from './utils/distance';

function App() {
  const [activeView, setActiveView] = useState('map');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMasjid, setSelectedMasjid] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Calculate distances and sort masjids
  const sortedMasjids = useMemo(() => {
    if (!userLocation) {
      return masjids;
    }

    return masjids
      .map((masjid) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          masjid.coordinates[0],
          masjid.coordinates[1]
        );
        return {
          ...masjid,
          distanceFromUser: distance,
          distance: formatDistance(distance),
        };
      })
      .sort((a, b) => a.distanceFromUser - b.distanceFromUser);
  }, [userLocation]);

  // Handle masjid card click - switch to map view and center on masjid
  const handleMasjidClick = (masjid) => {
    setSelectedMasjid(masjid);
    setActiveView('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* View Toggle */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('map')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'map'
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Map View
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                activeView === 'list'
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {locationError && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            {locationError}
          </div>
        )}
        {activeView === 'map' ? (
          <MapView
            masjids={sortedMasjids}
            userLocation={userLocation}
            selectedMasjid={selectedMasjid}
            onMasjidSelect={setSelectedMasjid}
          />
        ) : (
          <ListView
            masjids={sortedMasjids}
            onMasjidClick={handleMasjidClick}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            &copy; 2025 Iqamahs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
