interface MapStatsProps {
  visited: number;
  wishlist: number;
  total: number;
}

export default function MapStats({ visited, wishlist, total }: MapStatsProps) {
  return (
    <div className="map-stats grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="stat total p-6 bg-gradient-to-br from-primary-darkgray to-black rounded-xl shadow-xl text-center border border-green-500/20">      
        <div className="number text-3xl font-bold text-green-500">{visited}</div>
        <div className="label text-md text-primary-lightgray mt-1">Visitados</div>
      </div>
      <div className="stat visited p-6 bg-gradient-to-br from-primary-darkgray to-black rounded-xl shadow-xl text-center border border-primary-orange/20">      
        <div className="number text-3xl font-bold text-primary-orange">{wishlist}</div>
        <div className="label text-md text-primary-lightgray mt-1">Desejo visitar</div>
      </div>
      <div className="stat wishlist p-6 bg-gradient-to-br from-primary-darkgray to-black rounded-xl shadow-xl text-center border border-yellow-400/20">
        <div className="number text-3xl font-bold text-yellow-400">{total}</div>
        <div className="label text-md text-primary-lightgray mt-1">Total marcados</div>
      </div>
    </div>
  );
}