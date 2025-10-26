import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl">🕌</span>
            Iqamahs
          </h1>
          <p className="text-lg text-green-100">
            Find prayer times at masjids near you
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
