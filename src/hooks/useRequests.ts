import { useDispatch } from "react-redux";
import useHttp from "./http.hook";
import {
  pokemonUpdating,
  pokemonUpdated,
  pokemonUpdatingError,
  pokemonFiltered,
	getPokemonTypes,
} from "../slices/pokemonSlice.ts";
import { IPokemonStats } from "../types/types.ts";

export const useRequests = () => {
  const _pokemon_url = "https://pokeapi.co/api/v2/pokemon/";
	const _type_url = "https://pokeapi.co/api/v2/type"
  const dispatch = useDispatch();
  const { request } = useHttp();

  const fetchPokemons = () => {
		dispatch(pokemonUpdating());
		request(`${_pokemon_url}?limit=9&offset=0`)
			.then((data) => {
				const pokemonPromises = data.results.map((pokemon: IPokemonStats) => {
					return request(pokemon.url);
				});
				Promise.all(pokemonPromises)
					.then((pokemonData) => {
						dispatch(pokemonUpdated(pokemonData));
					});
			})
			.catch(() => dispatch(pokemonUpdatingError()));
	};

  const fetchFilteredPokemons = (type: string) => {
    request(`${_pokemon_url}type/${type}`)
      .then((data) => dispatch(pokemonFiltered(data)))
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
