import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCocktails } from "../../services/cocktailsdb.api";
import { Cocktail, RawCocktailData } from "../../types/cocktails";
import { setAllCocktails } from "./cocktails.reducer";

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
    fetchAllCocktails().then((rawAllCocktails) => {
      const formattedAllCocktails = rawAllCocktails
        .flatMap((cocktailsByLetter) => cocktailsByLetter.drinks)
        .filter(Boolean)
        .map(toFormattedCocktail);

      dispatch(setAllCocktails(formattedAllCocktails));
    });
  }, [dispatch]);
}
