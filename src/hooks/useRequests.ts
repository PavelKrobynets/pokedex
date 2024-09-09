import { useDispatch } from "react-redux";
import useHttp from "./http.hook";
import {
  pokemonUpdating,
  pokemonUpdated,
  pokemonUpdatingError,
  pokemonFiltered,
} from "../slices/pokemonSlice.ts";
import { IPokemonStats } from "../types/types.ts";

export const useRequests = () => {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const dispatch = useDispatch();
  const { request } = useHttp();

  const fetchPokemons = () => {
		dispatch(pokemonUpdating());
		request(`${url}?limit=9&offset=0`)
			.then((data) => {
				const pokemonPromises = data.results.map((pokemon: IPokemonStats) => {
					return request(pokemon.url);
				});
				Promise.all(pokemonPromises)
					.then((pokemonData) => {
						console.log(pokemonData);
						dispatch(pokemonUpdated(pokemonData));
					});
			})
			.catch(() => dispatch(pokemonUpdatingError()));
	};

  const fetchFilteredPokemons = (type: string) => {
    request(`${url}type/${type}`)
      .then((data) => dispatch(pokemonFiltered(data)))
      .catch(() => {
        console.log("Can't get filtered pokemons");
        dispatch(pokemonUpdatingError());
      });
  };

  return { fetchPokemons, fetchFilteredPokemons };
};
