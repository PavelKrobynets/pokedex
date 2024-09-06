import "./pokemonList.scss"
import bulbasaur from "../../assets/bulbasaur.png"

export default function PokemonList() { 
	return (
		<div className="pokemon-list">
			<h2>Choose your pokemon</h2>
			<ul className="pokemon-list__tabs">
				<li className="pokemon-list__tab">
					<img src={bulbasaur} alt="bulbasaur" />
					<h3 className="pokemon-list__tab-name">Bulbasaur</h3>
				</li>
				<li className="pokemon-list__tab">
					<img src={bulbasaur} alt="bulbasaur" />
					<h3 className="pokemon-list__tab-name">Bulbasaur</h3>
				</li>
				<li className="pokemon-list__tab">
					<img src={bulbasaur} alt="bulbasaur" />
					<h3 className="pokemon-list__tab-name">Bulbasaur</h3>
				</li>
			</ul>
		</div>
	);
}