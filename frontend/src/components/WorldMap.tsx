import React from 'react';
import { ReactComponent as WorldSVG } from '../assets/world.svg';

interface WorldMapProps {
  visitedCountries: string[];
  wishlistCountries: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries, wishlistCountries }) => {
  const getCountryColor = (code: string) => {
    if (visitedCountries.includes(code)) return '#4CAF50';
    if (wishlistCountries.includes(code)) return '#FF9800';
    return '#EAEAEC';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <WorldSVG className="w-full h-auto" style={{ maxHeight: '600px' }} />
      <style>
        {`
          path {
            stroke: #999;
          }
          ${visitedCountries.map(code => `#${code} { fill: #4CAF50 !important; }`).join('\n')}
          ${wishlistCountries.map(code => `#${code} { fill: #FF9800 !important; }`).join('\n')}
        `}
      </style>

    </div>
  );
};

export default WorldMap;
