import React, { useEffect, useState } from "react";
import PokemonCard from "../Component/PokemonCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesData = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesData);
  }, []);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-center text-2xl font-bold mb-4">Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p className="text-center">No favorite Pokémon yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} toggleFavorite={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;