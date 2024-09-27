import React from 'react';
import { Link } from 'react-router-dom';

const routes = [
  { id: 'route1', name: 'East Blue', color: 'blue' },
  { id: 'route2', name: 'Alabasta', color: 'yellow' },
  { id: 'route3', name: 'Sky Island', color: 'green' },
  { id: 'route4', name: 'Water 7', color: 'red' },
];

const OnePieceMap = () => {
  return (
    <div className="text-white pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map(route => (
          <Link
            key={route.id}
            to={`/${route.id}`}
            className={`route-link p-6 rounded-lg shadow-lg ${
              route.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
              route.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
              route.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
              'bg-red-600 hover:bg-red-700'
            }`}
          >
            <h3 className="text-xl text-white font-bold mb-2">{route.name}</h3>
            <p className="text-sm opacity-80">Embark on an exciting journey through {route.name}!</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnePieceMap;