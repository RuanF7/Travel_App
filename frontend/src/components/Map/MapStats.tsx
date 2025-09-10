import React from 'react';
import StatCard from './StatCard';

interface MapStatsProps {
  visited: number;
  wishlist: number;
  total: number;
}

export default function MapStats({ visited, wishlist, total }: MapStatsProps) {
  return (
    <div className="map-stats grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        value={visited} 
        label="Visitados" 
        color="text-green-500" 
        borderColor="border-green-500/20" 
      />
      <StatCard 
        value={wishlist} 
        label="Desejo visitar" 
        color="text-primary-orange" 
        borderColor="border-primary-orange/20" 
      />
      <StatCard 
        value={total} 
        label="Total marcados" 
        color="text-yellow-400" 
        borderColor="border-yellow-400/20" 
      />
    </div>
  );
}
