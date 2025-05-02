// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PokemonList from "./PokemonPage/PokemonList";
import PokemonDetail from "./Component/PokemonDetail";
import FavoritesPage from "./Component/FavoritesPage";
import PokemonComparison from "./PokemonPage/PokemonComparison";
import RandomPokemon from "./PokemonPage/RandomPokemon";
import ErrorBoundary from "./PokemonPage/ErrorBoundary";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ErrorBoundary>

      <Routes>
        <Route
          path="/"
          element={<Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
        >
          <Route path="/" element={<PokemonList searchTerm={searchTerm} />} />
          <Route path="pokemon/:id" element={<PokemonDetail />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<PokemonComparison />} />
          <Route path="/random" element={<RandomPokemon />} />
        </Route>
      </Routes>

    </ErrorBoundary>
  );
}
export default App;