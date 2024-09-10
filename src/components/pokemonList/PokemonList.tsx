import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRequests } from "../../hooks/useRequests";
import { RootState } from "../../store/store";
import Pokeball from "../loaders/Pokeball";
import { IPokemonStats, TPokemonTypes } from "../../types/types";
import PokemonTypes from "../pokemonTypes/PokemonTypes";
import "./pokemonList.scss";

export default function PokemonList() {
  const request = useRequests();
  const { pokemons, pokemonLoadingStatus } = useSelector(
    (state: RootState) => ({
      pokemons: state.pokemon.pokemons as IPokemonStats[],
      pokemonLoadingStatus: state.pokemon.pokemonLoading,
    })
  );

  useEffect(() => {
    request.fetchPokemons();
    // eslint-disable-next-line
  }, []);

  if (pokemonLoadingStatus === "loading") {
    return <Pokeball />;
  }
  if (pokemonLoadingStatus === "error") {
    return (
      <div className="pokemon-list">
        <h2>Error...</h2>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <h2>Choose your pokemon</h2>
      <ul className="pokemon-list__tabs">
        {pokemons.map((pokemon: IPokemonStats) => {
          return (
            <li key={pokemon.id} className="pokemon-list__tab">
              <img
                src={pokemon.sprites.other["official-artwork"]["front_default"]}
                alt={pokemon.name}
              />
              <h3 className="pokemon-list__tab-name">{pokemon.name}</h3>
              <ul className="pokemon-list__tab-types">
                {pokemon.types.map((item: TPokemonTypes) => {
                  return <PokemonTypes key={item.type.name} name={item.type.name} />;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
