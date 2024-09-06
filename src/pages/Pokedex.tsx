import PokemonList from "../components/pokemonList/PokemonList";
import PokemonMenu from "../components/pokemonMenu/PokemonMenu";
import "./pokedex.scss"


export default function Pokedex() { 
	return (
		<div className="pokedex">
			<PokemonMenu />
			<PokemonList />
		</div>
	);
}