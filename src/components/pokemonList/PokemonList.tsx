import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRequests } from "../../hooks/useRequests";
import { RootState } from "../../store/store";
import Pokeball from "../loaders/Pokeball";
import PokemonCard from "../pokemonCard/PokemonCard";
import PokemonFullInfo from "../pokemonFullInfo/PokemonFullInfo";
import "./pokemonList.scss";

export default function PokemonList() {
  const request = useRequests();
  const [limit, setLimit] = useState(90);
  const [offset, setOffset] = useState(0);
  const [slice, setSlice] = useState(9);
  const { pokemonLoadingStatus} = useSelector(
    (state: RootState) => ({
      pokemonLoadingStatus: state.pokemon.pokemonLoading
    })
  );

  useEffect(() => {
    request.fetchPokemons(limit);
    // eslint-disable-next-line
  }, []);



  let content;
  switch (pokemonLoadingStatus) {
    case "done":
      content = (
        <div className="pokemon-list">
          <h2>Choose your pokemon</h2>
          <ul className="pokemon-list__tabs">
            <PokemonCard slice={slice} />
          </ul>
          <button
            className="pokemon-list__load"
            onClick={() => {
              if (slice === limit) {
								request.fetchPokemons(limit + 90, offset + 90, false);
								setLimit(limit + 90);
								setOffset(offset + 90);
                setSlice(slice + 9);
              } else {
                setSlice(slice + 9);
              }
            }}
          >
            Load more
          </button>
        </div>
      );

      break;
    case "loading":
      content = <Pokeball />;
      break;
    case "error":
      content = <h2>Error...</h2>;
      break;
    case "single":
      content = <PokemonFullInfo />;
      break;
    default:
      content = null;
  }

  return <>{content}</>;
}
