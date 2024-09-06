import "./pokemonMenu.scss";
import PokemonFilter from "../pokemonFilter/PokemonFilter";
import PokemonStats from "../pokemonStats/pokemonStats";

export default function PokemonMenu() {
  return (
    <div className="pokemon-menu">
      <h2>Pokémon Menu</h2>
      <PokemonFilter/>
      <PokemonStats/>
    </div>
  );
}
