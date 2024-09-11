import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRequests } from "../../hooks/useRequests";
import { RootState } from "../../store/store";
import Pokeball from "../loaders/Pokeball";
import PokemonCard from "../pokemonCard/PokemonCard";
import "./pokemonList.scss";

export default function PokemonList() {
  const request = useRequests();
  const [offset, setOffset] = useState(0);
  const pokemonLoadingStatus = useSelector(
    (state: RootState) => state.pokemon.pokemonLoading
  );

  useEffect(() => {
    request.fetchPokemons(offset);
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
				<PokemonCard />
			</ul>
      <button
        className="pokemon-list__load"
        onClick={() => {
          const newOffset = offset + 9; // increment the offset
          setOffset(newOffset); // update the offset state
          request.fetchPokemons(newOffset, false);
        }}
      >
        Load more
      </button>
    </div>
  );
}
