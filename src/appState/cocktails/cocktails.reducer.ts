import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cocktail } from "../../types/cocktails";

type CocktailsState = {
  allCocktails: Cocktail[];
  hasError: boolean;
};

const initialState: CocktailsState = {
  allCocktails: [],
  hasError: false,
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
    setHasCocktailsFetchError: (
      state,
      { payload: hasError }: PayloadAction<boolean>
    ) => {
      state.hasError = hasError;
    },
  },
});

export const { setAllCocktails, setHasCocktailsFetchError } =
  cocktailsSlice.actions;

export default cocktailsSlice;
