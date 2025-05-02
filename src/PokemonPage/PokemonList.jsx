// src/PokemonPage/PokemonList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Component/Sidebar";
import PokemonCard from "../Component/PokemonCard";
import Pagination from "../Component/Pagination";

const PokemonList = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  // Load favorites from localStorage
  const getFavorites = () => JSON.parse(localStorage.getItem("favorites")) || [];

  // Add or remove Pokémon from favorites in localStorage
  const toggleFavorite = (pokemon) => {
    let favorites = getFavorites();
    const isFavorite = favorites.some(fav => fav.id === pokemon.id);

    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== pokemon.id);
    } else {
      favorites.push(pokemon);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150");
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(term) || pokemon.id.toString() === term
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeObj) => typeObj.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Loading Pokémon...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar selectedType={selectedType} setSelectedType={setSelectedType} />
      <div className="flex-1 p-4 flex flex-col justify-between">
        {filteredPokemon.length === 0 ? (
          <h1 className="text-center mt-8">No Pokémon found with this filter.</h1>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonList;