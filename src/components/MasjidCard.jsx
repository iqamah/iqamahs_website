import React from 'react';

const MasjidCard = ({ masjid }) => {
  const prayers = [
    { name: 'Fajr', time: masjid.prayerTimes.fajr },
    { name: 'Dhuhr', time: masjid.prayerTimes.dhuhr },
    { name: 'Asr', time: masjid.prayerTimes.asr },
    { name: 'Maghrib', time: masjid.prayerTimes.maghrib },
    { name: 'Isha', time: masjid.prayerTimes.isha },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100 animate-fade-in">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl flex-shrink-0">🕌</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {masjid.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {masjid.address}
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            {masjid.distance}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Today's Iqamah Times
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
            >
              <span className="text-sm font-medium text-gray-700">
                {prayer.name}
              </span>
              <span className="text-sm font-bold text-green-700">
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasjidCard;
