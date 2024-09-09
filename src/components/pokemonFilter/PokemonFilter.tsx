import "./pokemonFilter.scss"
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function PokemonFilter() { 
	return (
		<div className="pokemon-filter">
			<div className="pokemon-filter__search">
        <input className="pokemon-filter__search-input" type="text" />
        <button
          className="pokemon-filter__search-button"
          aria-label="Search Pokémon"
        >
          <FaMagnifyingGlass />
        </button>
      </div>
			<ul className="pokemon-filter__tabs">
        <li className="pokemon-filter__tabs-item_fire">Fire</li>
        <li className="pokemon-filter__tabs-item_water">Water</li>
        <li className="pokemon-filter__tabs-item_ground">Ground</li>
        <li className="pokemon-filter__tabs-item_flying">Flying</li>
        <li className="pokemon-filter__tabs-item_dark">Dark</li>
        <li className="pokemon-filter__tabs-item_electric">Electric</li>
      </ul>
		</div>
	);
}