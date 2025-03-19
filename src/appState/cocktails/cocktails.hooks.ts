import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllCocktails,
  fetchSingleCocktail,
  searchCocktails,
} from "../../services/cocktailsdb.api";
import { Cocktail, RawCocktailData } from "../../types/cocktails";
import {
  setAllCocktails,
  setFilteredCocktails,
  setCocktailsFetchErrorMessage,
} from "./cocktails.slice";
import useDebouncedCallback from "../../hooks/useDebouncedCallback";
import { useAppSelector } from "../store";
import {
  selectAllCocktails,
  selectFilteredCocktails,
} from "./cocktails.selectors";

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
  ...restOfProps
}: RawCocktailData): Cocktail => {
  return {
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

    rawIngredients: restOfProps,
  };
};

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

export function useCocktailById(cocktailId: string) {
  const dispatch = useDispatch();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    fetchSingleCocktail(cocktailId).then((response) => {
      if (!response.drinks) {
        dispatch(setCocktailsFetchErrorMessage("Cocktail not found"));
      } else {
        setCocktail(response.drinks.map(toFormattedCocktail)[0]);
      }
    });
  }, [cocktailId, dispatch]);

  return cocktail;
}

export function useCocktailsList() {
  const allCocktails = useAppSelector(selectAllCocktails);
  const filteredCocktails = useAppSelector(selectFilteredCocktails);

  return useMemo(
    () => (filteredCocktails.length ? filteredCocktails : allCocktails),
    [filteredCocktails, allCocktails]
  );
}
