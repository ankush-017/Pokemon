import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonComparison = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [pokemon1Id, setPokemon1Id] = useState("");
  const [pokemon2Id, setPokemon2Id] = useState("");

  const fetchPokemonData = async (id, setPokemon) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(res.data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  useEffect(() => {
    if (pokemon1Id) fetchPokemonData(pokemon1Id.toLowerCase(), setPokemon1);
    if (pokemon2Id) fetchPokemonData(pokemon2Id.toLowerCase(), setPokemon2);
  }, [pokemon1Id, pokemon2Id]);

  const handleSelectPokemon = (e, setPokemonId) => {
    setPokemonId(e.target.value);
  };

  const renderStats = (pokemon) => {
    return (
      <div className="space-y-2">
        {pokemon?.stats.map((stat) => (
          <div key={stat.stat.name} className="flex justify-between text-sm">
            <span className="font-medium capitalize">{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Compare Two Pokémon</h1>

      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          value={pokemon1Id}
          onChange={(e) => handleSelectPokemon(e, setPokemon1Id)}
          placeholder="Enter Pokémon 1 Name or ID"
          className="border rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={pokemon2Id}
          onChange={(e) => handleSelectPokemon(e, setPokemon2Id)}
          placeholder="Enter Pokémon 2 Name or ID"
          className="border rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pokémon 1 Card */}
        {pokemon1 && (
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <h2 className="text-2xl font-semibold capitalize mb-2">{pokemon1.name}</h2>
            <img
              src={pokemon1.sprites.front_default}
              alt={pokemon1.name}
              className="mx-auto mb-4 w-28 h-28"
            />
            {renderStats(pokemon1)}
          </div>
        )}

        {/* Pokémon 2 Card */}
        {pokemon2 && (
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <h2 className="text-2xl font-semibold capitalize mb-2">{pokemon2.name}</h2>
            <img
              src={pokemon2.sprites.front_default}
              alt={pokemon2.name}
              className="mx-auto mb-4 w-28 h-28"
            />
            {renderStats(pokemon2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonComparison;