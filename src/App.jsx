import { useState } from "react";
import api from "./services/api";

export function App() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTypedPokemon = (event) => {
    setTypedPokemon(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typedPokemon) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(response.data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError("We can't find the Pokémon! Sorry :(");
      setIsLoading(false);
      setPokemon(null);
    }
  };

  const formatStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div>
      <h1>Welcome to PokeStats!</h1>
      <h2>Type the Pokémon name to search.</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={typedPokemon}
          placeholder="Pokémon name"
          onChange={handleTypedPokemon}
        />
        <button type="submit">
          {isLoading ? <span>Loading...</span> : <span>Search!</span>}
        </button>
      </form>
      {pokemon && (
        <div key={pokemon.id}>
          {isLoading ? (
            <span></span>
          ) : (
            <section>
              <div>
                <p><strong>Name & ID:</strong> {formatStr(pokemon.name)} #{pokemon.id}</p>
                <p><strong>Type:</strong> {formatStr(pokemon.types[0].type.name)}</p>
                <p><strong>Height:</strong> {pokemon.height * 10} cm</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
              </div>
              <img src={pokemon.sprites['front_default']} alt={formatStr(pokemon.name)} title={formatStr(pokemon.name)}></img>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
