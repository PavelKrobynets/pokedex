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
        <dt>Forms:</dt>
        <dd>3</dd>
      </dl>
			<button aria-label="View more details about pokemon" className="pokemon-list__load">More details</button>
    </div>
  );
}
