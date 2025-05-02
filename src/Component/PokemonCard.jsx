import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, updateFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the Pokémon is already a favorite when the component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.some(fav => fav.id === pokemon.id)) {
      setIsFavorite(true);
    }
  }, [pokemon.id]);

  const handleFavoriteClick = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Add to favorites
    if (!isFavorite) {
      favorites.push(pokemon);
    } else {
      // Remove from favorites
      favorites = favorites.filter(fav => fav.id !== pokemon.id);
    }

    // Update localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Update the local state of the component
    setIsFavorite(prev => !prev);

    // Update the favorites in the parent component (optional, for UI updates)
    updateFavorites(favorites);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      {/* Link to the detail page of the Pokémon */}
      <Link to={`/pokemon/${pokemon.id}`} className="block">
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
      </Link>

      {/* Button to add/remove from favorites */}
      <button
        onClick={handleFavoriteClick}
        className={`mt-4 px-4 py-2 ${isFavorite ? "bg-red-500" : "bg-yellow-600"} text-white rounded`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};
export default PokemonCard;