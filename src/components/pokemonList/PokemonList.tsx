import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRequests } from "../../hooks/useRequests";
import { RootState } from "../../store/store";
import Pokeball from "../loaders/Pokeball";
import PokemonCard from "../pokemonCard/PokemonCard";
import "./pokemonList.scss";

export default function PokemonList() {
  const request = useRequests();
  const [limit, setLimit] = useState(90);
  const [offset, setOffset] = useState(0);
  const [slice, setSlice] = useState(9);
  const {pokemonLoadingStatus, pokemons} = useSelector((state: RootState) => ({
    pokemonLoadingStatus: state.pokemon.pokemonLoading,
    pokemons: state.pokemon.pokemons,
  }));

  useEffect(() => {
    request.fetchPokemons(limit);
		request.fetchEvolutionForms("Pinsir")
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
		setLimit(90)
		setOffset(0)
		setSlice(9)
	},[pokemons]);

  let content;
  switch (pokemonLoadingStatus) {
    case "done":
      content = (
        <>
          <ul className="pokemon-list__tabs">
            <PokemonCard slice={slice} />
          </ul>
          <button
            className="pokemon-list__load"
            onClick={() => {
              if (slice === limit) {
                const newLimit = limit + 90,
                  newOffset = offset + 90;
                setOffset(newOffset);
                setLimit(newLimit);
                request.fetchPokemons(newLimit, newOffset, false);
                setSlice(slice + 9);
              } else {
                setSlice(slice + 9);
              }
            }}
          >
            Load more
          </button>
        </>
      );

      break;
    case "loading":
      content = <Pokeball />;
      break;
    case "error":
      content = <h2>Error...</h2>;
      break;
    default:
      content = null;
  }

  return (
    <div className="pokemon-list">
      <h2>Choose your pokemon</h2>
      {content}
    </div>
  );
}
