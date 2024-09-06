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
        <li className="pokemon-filter__tabs-item">Fire</li>
        <li className="pokemon-filter__tabs-item">Water</li>
        <li className="pokemon-filter__tabs-item">Earth</li>
        <li className="pokemon-filter__tabs-item">Wind</li>
        <li className="pokemon-filter__tabs-item">Dark</li>
        <li className="pokemon-filter__tabs-item">Light</li>
      </ul>
		</div>
	);
}