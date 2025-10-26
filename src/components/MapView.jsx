import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon for masjids
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        position: relative;
        width: 40px;
        height: 40px;
      ">
        <div style="
          background: linear-gradient(135deg, #15803d 0%, #166534 100%);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        ">
          <span style="transform: rotate(45deg); font-size: 20px;">🕌</span>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

// Custom marker icon for user location
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        position: relative;
        width: 24px;
        height: 24px;
      ">
        <div style="
          background: #3b82f6;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
        </div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #1e40af;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        ">
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Component to control map centering
const MapController = ({ selectedMasjid }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedMasjid) {
      map.flyTo(selectedMasjid.coordinates, 14, {
        duration: 1.5,
      });
    }
  }, [selectedMasjid, map]);

  return null;
};

const MapView = ({ masjids, userLocation, selectedMasjid }) => {
  const center = userLocation ? [userLocation.lat, userLocation.lng] : [29.7604, -95.3698];

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={11}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedMasjid={selectedMasjid} />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createUserIcon()}
          >
            <Popup>
              <div className="p-2">
                <p className="font-semibold text-blue-700">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Masjid markers */}
        {masjids.map((masjid) => (
          <Marker
            key={masjid.id}
            position={masjid.coordinates}
            icon={createCustomIcon()}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-1">
                  {masjid.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {masjid.address}
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  {masjid.distance}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
