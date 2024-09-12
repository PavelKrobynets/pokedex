import "./pokemonStats.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { IPokemonStats } from "../../types/types";

export default function PokemonStats() {
  const pokemon: IPokemonStats = useSelector(
    (state: RootState) => state.pokemon.singlePokemon
  );


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
      >
        More details
      </button>
    </div>
  );
}
