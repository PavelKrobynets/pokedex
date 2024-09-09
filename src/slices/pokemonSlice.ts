import { createSlice } from "@reduxjs/toolkit";

interface IPokemonState {
  pokemons: unknown[];
  pokemonLoading: "done" | "loading" | "error";
}

const initialState: IPokemonState = {
  pokemons: [],
  pokemonLoading: "done",
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
    pokemonUpdatingError(state) {
      state.pokemonLoading = "error";
    },
    pokemonFiltered(state, action) {
      state.pokemons = action.payload;
    },
  },
});

export const {
  pokemonUpdating,
  pokemonUpdated,
  pokemonUpdatingError,
  pokemonFiltered,
} = pokemonSlice.actions;

export const pokemonReducer = pokemonSlice.reducer;
