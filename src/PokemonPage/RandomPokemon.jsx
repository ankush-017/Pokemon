import React, { useState } from "react";
import axios from "axios";

const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState(null);

  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setPokemon(res.data);
    } catch (error) {
      console.error("Error fetching random Pokémon:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center p-6 max-w-md mx-auto">
      <button
        onClick={getRandomPokemon}
        className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
      >
        Get Random Pokémon
      </button>

      {pokemon && (
        <div className="mt-6 w-full bg-white shadow-lg rounded-lg p-6 text-center animate-fade-in">
          <h2 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto w-32 h-32 mb-4"
          />
          <p className="text-gray-700 font-medium">ID: #{pokemon.id}</p>
          <div className="flex justify-center flex-wrap gap-2 mt-3">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPokemon;