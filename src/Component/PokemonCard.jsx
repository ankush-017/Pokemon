import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto my-2 w-24 h-24"
      />
      <p className="text-gray-700">ID: {pokemon.id}</p>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;