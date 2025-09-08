interface MapStatsProps {
  visited: number;
  wishlist: number;
  total: number;
}

export default function MapStats({ visited, wishlist, total }: MapStatsProps) {
  return (
    <div className="map-stats grid grid-cols-3 gap-4 mb-6">
      <div className="stat visited p-3 bg-green-100 rounded text-center">
        <div className="number text-2xl font-bold text-green-800">{visited}</div>
        <div className="label text-sm text-green-600">Visitados</div>
      </div>
      <div className="stat wishlist p-3 bg-orange-100 rounded text-center">
        <div className="number text-2xl font-bold text-orange-800">{wishlist}</div>
        <div className="label text-sm text-orange-600">Desejo visitar</div>
      </div>
      <div className="stat total p-3 bg-blue-100 rounded text-center">
        <div className="number text-2xl font-bold text-blue-800">{total}</div>
        <div className="label text-sm text-blue-600">Total marcados</div>
      </div>
    </div>
  );
}
