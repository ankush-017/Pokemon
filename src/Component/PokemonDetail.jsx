import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);

        // Evolution chain
        const speciesRes = await axios.get(res.data.species.url);
        const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
        const chain = extractEvolutionChain(evoRes.data.chain);
        setEvolutionChain(chain);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const extractEvolutionChain = (chain) => {
    const result = [];
    let current = chain;
    while (current) {
      result.push(current.species.name);
      current = current.evolves_to[0];
    }
    return result;
  };

  if (loading || !pokemon) {
    return <div className="flex justify-center items-center font-bold min-h-screen mt-10">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back to List</Link>
      <h1 className="text-2xl capitalize font-bold">{pokemon.name} (#{pokemon.id})</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 my-4" />

      <h2 className="text-xl font-semibold mt-4">Stats</h2>
      <ul className="list-disc pl-6">
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name.toUpperCase()}: {stat.base_stat}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Abilities</h2>
      <ul className="list-disc pl-6">
        {pokemon.abilities.map(a => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Moves (First 10)</h2>
      <ul className="list-disc pl-6">
        {pokemon.moves.slice(0, 10).map(m => (
          <li key={m.move.name}>{m.move.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Evolution Chain</h2>
      <div className="flex gap-2 mt-2">
        {evolutionChain.map((name, index) => (
          <span key={index} className="capitalize bg-gray-200 px-3 py-1 rounded">{name}</span>
        ))}
      </div>
    </div>
  );
};
export default PokemonDetail;