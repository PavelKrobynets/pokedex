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
          console.log(data);
          dispatch(singlePokemon(data));
        })
        .catch(() => {
          dispatch(pokemonUpdatingError());
          console.log("Error fetching single pokemon");
        });
    }; // eslint-disable-next-line
  }, [singlePokemonData]);

  const fetchEvolutionForms = (pokemonName: string) => {
    let imgNumber: number;
    request(`${_pokemon_url}${pokemonName.toLowerCase()}`)
      .then((data) => {
        imgNumber = data.id;
        return request(data.species.url);
      })
      .then((data) => {
        return request(data.evolution_chain.url);
      })
      .then((data) => {
        const evolutionForms: IPokemonEvolutionObj[] = [];
        function extractEvolutionForms(chain: EvolutionChain) {
          if (chain && chain.chain && chain.chain.species) {
            evolutionForms.push({
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imgNumber}.png`,
              name: chain.chain.species.name,
            });
          }
          if (
            chain.chain.evolves_to &&
            chain.chain.evolves_to[0] &&
            chain.chain.evolves_to[0].species
          ) {
            request(
              `${_pokemon_url}/${chain.chain.evolves_to[0].species.name}`
            ).then((data) => {
              evolutionForms.push({
                img: data.sprites.other["official-artwork"]["front_default"],
                name: chain.chain.evolves_to[0].species.name,
              });
            });
          }
          if (
						chain.chain.evolves_to[0] &&
            chain.chain.evolves_to[0].evolves_to &&
            chain.chain.evolves_to[0].evolves_to[0] &&
            chain.chain.evolves_to[0].evolves_to[0].species
          ) {
            request(
              `${_pokemon_url}/${chain.chain.evolves_to[0].evolves_to[0].species.name}`
            ).then((data) => {
              evolutionForms.push({
                img: data.sprites.other["official-artwork"]["front_default"],
                name: chain.chain.evolves_to[0].evolves_to[0].species.name,
              });
            });
          } else {
            return;
          }
        }
        extractEvolutionForms(data);
        console.log(evolutionForms);
        return evolutionForms;
      });
  };

  return {
    fetchPokemons,
    fetchFilteredPokemons,
    fetchPokemonTypes,
    fetchSinglePokemon,
    fetchEvolutionForms,
  };
};
