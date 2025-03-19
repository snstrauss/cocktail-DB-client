import { RawCocktailsResponse } from "../types/cocktails";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

function getJson(url: string) {
  return fetch(url).then((res) => res.json());
}

const allLetters = "abcdefghijklmnopqrstuvwxyz";
const allDigits = "0123456789";

export function fetchAllCocktails(): Promise<RawCocktailsResponse[]> {
  return Promise.all(
    [...allLetters, ...allDigits].map((letter) => {
      return getJson(`${BASE_URL}/search.php?f=${letter}`);
    })
  );
}

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
