import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "../slices/pokemonSlice";

export const store = configureStore({
	reducer: {
		pokemon: pokemonReducer,
	}
})

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']