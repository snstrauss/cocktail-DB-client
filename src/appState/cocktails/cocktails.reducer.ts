import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cocktail } from "../../types/cocktails";

type CocktailsState = {
  allCocktails: Cocktail[];
};

const initialState: CocktailsState = {
  allCocktails: [],
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
  },
});

export const { setAllCocktails } = cocktailsSlice.actions;

export default cocktailsSlice;
