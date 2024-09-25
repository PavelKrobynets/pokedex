import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "./http.hook";
import { RootState } from "../store/store.ts";
import {
  pokemonUpdating,
  pokemonUpdated,
  pokemonUpdatingError,
  pokemonFiltered,
  getPokemonTypes,
  pokemonNewList,
  singlePokemon,
  getEvolutionForms,
} from "../slices/pokemonSlice.ts";
import {
  IPokemonStats,
  TFilteredPokemonUrl,
  IPokemonEvolutionObj,
  EvolutionChain,
} from "../types/types.ts";

export const useRequests = () => {
  const _pokemon_url = "https://pokeapi.co/api/v2/pokemon/";
  const _type_url = "https://pokeapi.co/api/v2/type";
  const singlePokemonData = useSelector(
    (state: RootState) => state.pokemon.singlePokemon
  );
  const dispatch = useDispatch();
  const { request } = useHttp();
  const _baseLimit = 90;
  const _baseOffset = 0;

  const fetchPokemons = (
    limit: number = _baseLimit,
    offset: number = _baseOffset,
    reset: boolean = false
  ) => {
    dispatch(pokemonUpdating());
    request(`${_pokemon_url}?limit=${limit}&offset=${offset}`)
      .then((data) => {
        const pokemonPromises = data.results.map((pokemon: IPokemonStats) => {
          if (pokemon.url) {
            return request(pokemon.url);
          } else {
            return console.log("Fetching pokemon crashed");
          }
        });
        Promise.all(pokemonPromises).then((pokemonData) => {
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
        const pokemonPromises = data.pokemon.map(
          (pokemon: TFilteredPokemonUrl) => {
            return request(pokemon.pokemon.url);
          }
        );
        Promise.all(pokemonPromises).then((pokemonData) => {
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
      .then((data) => {
        dispatch(getPokemonTypes(data.results));
      })
      .catch(() => {
        console.log("Can't get pokemon types");
      });
  };

  const fetchSinglePokemon = useMemo(() => {
    return (name: string) => {
      request(`${_pokemon_url}${name}`)
        .then((data) => {
          dispatch(singlePokemon(data));
        })
        .catch(() => {
          dispatch(pokemonUpdatingError());
          console.log("Error fetching single pokemon");
        });
    }; // eslint-disable-next-line
  }, [singlePokemonData]);


  const fetchEvolutionForms = async (pokemonName: string) => {
    try {
      const data = await request(`${_pokemon_url}${pokemonName.toLowerCase()}`);
      const speciesData = await request(data.species.url);
      const evolutionChainData = await request(speciesData.evolution_chain.url);

      const evolutionForms: IPokemonEvolutionObj[] = [];

      if (evolutionChainData.chain && evolutionChainData.chain.species) {
				const name = await request(`${_pokemon_url}${evolutionChainData.chain.species.name.toLowerCase()}`)
        evolutionForms.push({
          img: name.sprites.other["official-artwork"]["front_default"],
          name: evolutionChainData.chain.species.name,
        });
      }

      if (evolutionChainData.chain.evolves_to) {
        const evolvesToData = await Promise.all(
          evolutionChainData.chain.evolves_to.map((evolution) =>
            request(`${_pokemon_url}/${evolution.species.name}`)
          )
        );

        evolvesToData.forEach((data, index) => {
          evolutionForms.push({
            img: data.sprites.other["official-artwork"]["front_default"],
            name: evolutionChainData.chain.evolves_to[index].species.name,
          });
        });
      }

      if (
        evolutionChainData.chain.evolves_to &&
        evolutionChainData.chain.evolves_to[0] &&
        evolutionChainData.chain.evolves_to[0].evolves_to &&
        evolutionChainData.chain.evolves_to[0].evolves_to[0] &&
        evolutionChainData.chain.evolves_to[0].evolves_to[0].species
      ) {
        const data = await request(
          `${_pokemon_url}/${evolutionChainData.chain.evolves_to[0].evolves_to[0].species.name}`
        );
        evolutionForms.push({
          img: data.sprites.other["official-artwork"]["front_default"],
          name: evolutionChainData.chain.evolves_to[0].evolves_to[0].species
            .name,
        });
      }

      console.log(evolutionForms);
      dispatch(getEvolutionForms(evolutionForms));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchPokemons,
    fetchFilteredPokemons,
    fetchPokemonTypes,
    fetchSinglePokemon,
    fetchEvolutionForms,
  };
};
