import { RawCocktailsResponse } from "../types/cocktails";
import {
  getRawCocktailsDataFromLocalStorage,
  setRawCocktailsDataToLocalStorage,
} from "./cocktailsLocalStorage";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

function getJson(url: string) {
  return fetch(url).then((res) => res.json());
}

const allLetters = "abcdefghijklmnopqrstuvwxyz";
const allDigits = "0123456789";

export const fetchAllCocktails = async (): Promise<RawCocktailsResponse[]> => {
  return new Promise((resolve) => {
    const cachedData = getRawCocktailsDataFromLocalStorage();

    if (cachedData.length) {
      resolve(cachedData);
    } else {
      Promise.allSettled(
        [...allLetters, ...allDigits].map((letter) => {
          return getJson(`${BASE_URL}/search.php?f=${letter}`);
        })
      ).then((responses) => {
        const validResponses = responses
          .filter((response) => response.status === "fulfilled")
          .map((response) => response.value);

        setRawCocktailsDataToLocalStorage(validResponses);

        resolve(validResponses);
      });
    }
  });
};

export function searchCocktails(
  searchValue: string
): Promise<RawCocktailsResponse> {
  return getJson(`${BASE_URL}/search.php?s=${searchValue}`);
}

export function fetchSingleCocktail(
  cocktailId: string
): Promise<RawCocktailsResponse> {
  return getJson(`${BASE_URL}/lookup.php?i=${cocktailId}`);
}
