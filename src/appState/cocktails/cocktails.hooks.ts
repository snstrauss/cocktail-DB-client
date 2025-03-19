import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllCocktails,
  searchCocktails,
} from "../../services/cocktailsdb.api";
import { Cocktail, RawCocktailData } from "../../types/cocktails";
import {
  setAllCocktails,
  setFilteredCocktails,
  setCocktailsFetchErrorMessage,
} from "./cocktails.slice";
import useDebouncedCallback from "../../hooks/useDebouncedCallback";

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
        dispatch(
          setCocktailsFetchErrorMessage("Error initializing drinks library")
        );
      });
  }, [dispatch]);
}

export function useDebouncedCocktailsSearch() {
  const dispatch = useDispatch();

  return useDebouncedCallback((debouncedValue) => {
    if (typeof debouncedValue === "string") {
      if (debouncedValue.length === 0) {
        // search field is empty - fall back to the full list from store
        dispatch(setCocktailsFetchErrorMessage(null));
        dispatch(setFilteredCocktails([]));
      } else {
        searchCocktails(debouncedValue).then((filteredCocktails) => {
          if (filteredCocktails.drinks) {
            dispatch(setCocktailsFetchErrorMessage(null));
            dispatch(
              setFilteredCocktails(
                filteredCocktails.drinks.map(toFormattedCocktail)
              )
            );
          } else {
            dispatch(setCocktailsFetchErrorMessage("No such drink exists"));
          }
        });
      }
    }
  });
}
