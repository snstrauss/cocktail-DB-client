import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cocktail } from "../../types/cocktails";

type CocktailsErrorMessage = string | null;

type CocktailsState = {
  allCocktails: Cocktail[];
  filteredCocktails: Cocktail[];
  errorMessage: CocktailsErrorMessage;
};

const initialState: CocktailsState = {
  allCocktails: [],
  filteredCocktails: [],
  errorMessage: null,
};

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    setAllCocktails: (
      state,
      { payload: allCocktails }: PayloadAction<Cocktail[]>
    ) => {
      state.allCocktails = allCocktails;
    },
    setFilteredCocktails: (
      state,
      { payload: filteredCocktails }: PayloadAction<Cocktail[]>
    ) => {
      state.filteredCocktails = filteredCocktails;
    },
    setCocktailsFetchErrorMessage: (
      state,
      { payload: errorMessage }: PayloadAction<CocktailsErrorMessage>
    ) => {
      state.errorMessage = errorMessage;
    },
  },
});

export const {
  setAllCocktails,
  setFilteredCocktails,
  setCocktailsFetchErrorMessage,
} = cocktailsSlice.actions;

export default cocktailsSlice;
