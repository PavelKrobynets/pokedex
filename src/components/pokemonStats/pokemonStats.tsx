import "./pokemonStats.scss";
import bulbasaur from "../../assets/bulbasaur.png";

export default function PokemonStats() {
  return (
    <div className="pokemon-stats">
      <img src={bulbasaur} alt="bulbasaur" className="pokemon-stats__img" />
      <h3 className="pokemon-stats__name">Bulbasaur</h3>
      <dl className="pokemon-stats__info">
        <dt>Type:</dt>
        <dd>Grass/Poison</dd>
        <dt>Weight:</dt>
        <dd>69</dd>
      </dl>
      <button
        className="pokemon-stats__button"
        aria-label="View more details about Bulbasaur"
      >
        More details
      </button>
    </div>
  );
}
