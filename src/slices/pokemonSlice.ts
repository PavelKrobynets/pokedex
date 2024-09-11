import { createSlice } from "@reduxjs/toolkit";

export interface IPokemonType {
  name: string;
  url: string;
}

export interface IPokemonState {
  pokemons: object[];
  pokemonLoading: "done" | "loading" | "error";
  types: IPokemonType[];
}

const initialState: IPokemonState = {
  pokemons: [],
  pokemonLoading: "done",
  types: [],
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
		pokemonNewList(state, action){
			state.pokemons = [...action.payload]
      state.pokemonLoading = "done";
		},
    pokemonUpdatingError(state) {
      state.pokemonLoading = "error";
    },
    pokemonFiltered(state, action) {
      state.pokemons = action.payload;
      state.pokemonLoading = "done";
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
	pokemonNewList
} = pokemonSlice.actions;

export const pokemonReducer = pokemonSlice.reducer;
