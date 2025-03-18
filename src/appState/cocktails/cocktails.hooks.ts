import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCocktails } from "../../services/cocktailsdb.api";
import { Cocktail, RawCocktailData } from "../../types/cocktails";
import {
  setAllCocktails,
  setHasCocktailsFetchError,
} from "./cocktails.reducer";

const toFormattedCocktail = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strImageSource,
  strInstructions,
  strInstructionsES,
  strInstructionsDE,
  strInstructionsFR,
  strInstructionsIT,
  strCategory,
  strAlcoholic,
  strGlass,
}: RawCocktailData): Cocktail => ({
  id: idDrink,
  name: strDrink,
  thumbnail: strDrinkThumb,
  image: strImageSource,

  instructions: {
    en: strInstructions,
    es: strInstructionsES,
    de: strInstructionsDE,
    fr: strInstructionsFR,
    it: strInstructionsIT,
  },
  extraDetails: {
    category: strCategory,
    alcoholic: strAlcoholic,
    glass: strGlass,
  },
});

export function useInitializeCocktailsList() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllCocktails()
      .then((rawAllCocktails) => {
        const formattedAllCocktails = rawAllCocktails
          .flatMap((cocktailsByLetter) => cocktailsByLetter.drinks)
          .filter(Boolean)
          .map(toFormattedCocktail);

        // this timeout is here only to show off the loader animation
        setTimeout(() => {
          dispatch(setAllCocktails(formattedAllCocktails));
        }, 2000);
      })
      .catch(() => {
        dispatch(setHasCocktailsFetchError(true));
      });
  }, [dispatch]);
}
