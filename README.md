# Iqamahs Website

A modern, sleek website for finding prayer times at masjids in the Houston area. Built with React, Tailwind CSS, and Leaflet for interactive maps.

## Features

- **Interactive Map View**: See all masjids on an interactive map with custom markers
- **List View**: Browse masjids in a clean card-based layout
- **Prayer Times**: View Iqamah times for all five daily prayers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a sleek, modern appearance

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **React Leaflet**: Interactive maps
- **Leaflet**: Open-source mapping library

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header component with title
│   ├── MapView.jsx         # Interactive map view
│   ├── ListView.jsx        # List view container
│   └── MasjidCard.jsx      # Individual masjid card
├── data/
│   └── masjids.js          # Masjid data
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles with Tailwind
```

## Masjids Included

1. Islamic Society of Greater Houston
2. Al-Noor Society of Houston
3. Bear Creek Islamic Center

## License

All rights reserved &copy; 2025 Iqamahs
