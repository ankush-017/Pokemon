import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import TypeFilter from "./TypeFilter";

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [loading, setLoading] = useState(true);

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

        // Filter by name (search term)
        if (searchTerm) {
            filtered = filtered.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by type
        if (selectedType) {
            filtered = filtered.filter((pokemon) =>
                pokemon.types.some((typeObj) => typeObj.type.name === selectedType)
            );
        }

        setFilteredPokemon(filtered);
    }, [searchTerm, selectedType, pokemonList]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-xl font-semibold">Loading Pokémon...</h1>
            </div>
        );

    }

    if (filteredPokemon.length === 0) {
        return <div className="p-4 ">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            <h1 className="text-center">No Pokémon found with this filter.</h1>
        </div>;
    }

    return (
        <div className="p-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};
export default PokemonList;