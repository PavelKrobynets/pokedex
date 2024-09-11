import { IPokemonStats, TPokemonTypes } from "../../types/types";
import PokemonTypes from "../pokemonTypes/PokemonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./pokemonCard.scss"

export default function PokemonCard() {
  const pokemons = useSelector(
    (state: RootState) => state.pokemon.pokemons as IPokemonStats[]
  );

  return(
		<>{
			pokemons.map((pokemon: IPokemonStats) => {
				return (
					<li key={pokemon.id} className="pokemon-list__tab">
						<img
							src={pokemon.sprites.other["official-artwork"]["front_default"]}
							alt={pokemon.name}
						/>
						<h3 className="pokemon-list__tab-name">{pokemon.name}</h3>
						<ul className="pokemon-list__tab-types">
							{pokemon.types.map((item: TPokemonTypes) => {
								return (
									<PokemonTypes
										key={item.type.name}
										name={item.type.name}
										char={true}
									/>
								);
							})}
						</ul>
					</li>
				);
			})
		}
		</>
	)
}
