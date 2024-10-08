import { createSlice } from "@reduxjs/toolkit";
import { ISinglePokemonData } from "../types/types";


export interface IPokemonType {
  name: string;
  url: string;
}

export interface IPokemonState {
  pokemons: object[];
  pokemonLoading: "done" | "loading" | "error" | "single";
  types: IPokemonType[];
  singlePokemon: ISinglePokemonData;
}

const initialState: IPokemonState = {
  pokemons: [],
  pokemonLoading: "done",
  types: [],
  singlePokemon: {
    name: "slowpoke",
    types: [{ type: { name: "water" } }, { type: { name: "psychic" } }],
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png",
        },
      },
    },
    forms: [{}, {}],
    evolutions: [],
    stats: [],
  },
};

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    pokemonUpdating(state) {
      state.pokemonLoading = "loading";
    },
    pokemonUpdated(state, action) {
      state.pokemons = [...state.pokemons, ...action.payload];
      state.pokemonLoading = "done";
    },
    pokemonNewList(state, action) {
      state.pokemons = [...action.payload];
      state.pokemonLoading = "done";
    },
    pokemonUpdatingError(state) {
      state.pokemonLoading = "error";
    },
    pokemonFiltered(state, action) {
      state.pokemons = action.payload;
      state.pokemonLoading = "done";
    },
    singlePokemon(state, action) {
      state.singlePokemon = action.payload;
    },
		getEvolutionForms(state, action) {
			console.log(action.payload)
			state.singlePokemon.evolutions = action.payload;
			state.pokemonLoading = "single";
		},
    getPokemonTypes(state, action) {
      state.types = [...state.types, ...action.payload];
    },
  },
});

export const {
  pokemonUpdating,
  pokemonUpdated,
  pokemonUpdatingError,
  pokemonFiltered,
  getPokemonTypes,
  pokemonNewList,
  singlePokemon,
	getEvolutionForms
} = pokemonSlice.actions;

export const pokemonReducer = pokemonSlice.reducer;
