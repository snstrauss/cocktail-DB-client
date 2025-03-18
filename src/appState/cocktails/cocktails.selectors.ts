import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCocktails = (state: RootState) => state.cocktails;

export const selectAllCocktails = createSelector(
  [selectCocktails],
  (cocktailsState) => cocktailsState.allCocktails
);

export const selectHasCocktailsFetchError = createSelector(
  [selectCocktails],
  (cocktailsState) => cocktailsState.hasError
);
