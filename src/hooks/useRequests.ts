import { useDispatch } from "react-redux";
import useHttp from "./http.hook";
import {
  pokemonUpdating,
  pokemonUpdated,
  pokemonUpdatingError,
  pokemonFiltered,
	getPokemonTypes,
	pokemonNewList,
} from "../slices/pokemonSlice.ts";
import { IPokemonStats, TFilteredPokemonUrl } from "../types/types.ts";

export const useRequests = () => {
  const _pokemon_url = "https://pokeapi.co/api/v2/pokemon/";
	const _type_url = "https://pokeapi.co/api/v2/type"
  const dispatch = useDispatch();
  const { request } = useHttp();
	const _basOffset = 0;

  const fetchPokemons = (offset: number = _basOffset, reset: boolean = false) => {
		dispatch(pokemonUpdating());
		request(`${_pokemon_url}?limit=9&offset=${offset}`)
			.then((data) => {
				const pokemonPromises = data.results.map((pokemon: IPokemonStats) => {
					return request(pokemon.url);
				});
				Promise.all(pokemonPromises)
					.then((pokemonData) => {
						if (reset) {
							dispatch(pokemonNewList(pokemonData));
						} else {
							dispatch(pokemonUpdated(pokemonData));
						}
					});
			})
			.catch(() => dispatch(pokemonUpdatingError()));
	};

  const fetchFilteredPokemons = (type: string) => {
    request(`${_type_url}/${type}`)
      .then((data) => {
				const pokemonPromises = data.pokemon.map((pokemon: TFilteredPokemonUrl) => {
					return request(pokemon.pokemon.url);
				});
				Promise.all(pokemonPromises)
				.then((pokemonData) => {
					console.log(pokemonData);
					dispatch(pokemonFiltered(pokemonData));
					});
			})
      .catch(() => {
        console.log("Can't get filtered pokemons");
        dispatch(pokemonUpdatingError());
      });
  };

	const fetchPokemonTypes = () => {
		request(`${_type_url}`)
		.then((data) => {dispatch(getPokemonTypes(data.results))})
		.catch(() => {
			console.log("Can't get pokemon types");
		})

	}

  return { fetchPokemons, fetchFilteredPokemons, fetchPokemonTypes };
};
