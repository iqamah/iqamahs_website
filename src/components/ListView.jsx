import React from 'react';
import MasjidCard from './MasjidCard';

const ListView = ({ masjids, onMasjidClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {masjids.map((masjid) => (
        <MasjidCard
          key={masjid.id}
          masjid={masjid}
          onClick={() => onMasjidClick(masjid)}
        />
      ))}
    </div>
  );
};

export default ListView;
