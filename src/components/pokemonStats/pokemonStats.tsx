import "./pokemonStats.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { ISinglePokemonData } from "../../types/types";
import { useRequests } from "../../hooks/useRequests";
import { useEffect } from "react";

export default function PokemonStats() {
  const pokemon: ISinglePokemonData = useSelector(
    (state: RootState) => state.pokemon.singlePokemon
  );
	const request = useRequests();

	useEffect(() => {
		request.fetchSinglePokemon("slowpoke")
		// eslint-disable-next-line
	},[])

  return (
    <div className="pokemon-stats">
      <img
        src={pokemon.sprites.other["official-artwork"]["front_default"]}
        alt="pokemon image"
        className="pokemon-stats__img"
      />
      <h3 className="pokemon-stats__name">{pokemon.name}</h3>
      <dl className="pokemon-stats__info">
        <dt>Type:</dt>
        <dd>{pokemon.types && pokemon.types.map((obj) => obj.type.name).join("/")}</dd>
        <dt>Forms:</dt>
        <dd>{pokemon.forms && pokemon.forms.length}</dd>
      </dl>
      <button
        aria-label="View more details about pokemon"
        className="pokemon-list__load"
				onClick={() => {request.fetchEvolutionForms(pokemon.name)}}
      >
        More details
      </button>
    </div>
  );
}
