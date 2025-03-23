import { Cocktail, RawCocktailsResponse } from "../types/cocktails";

const CUSTOM_COCKTAILS_KEY = "customCocktails";
const RAW_COCKTAILS_DATA_KEY = "rawCocktailsData";

const CACHE_EXPIRY_KEY = "rawCocktailCacheExpiry";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day

export function getCocktailsFromLocalStorage() {
  const cocktails = localStorage.getItem(CUSTOM_COCKTAILS_KEY);
  return cocktails ? JSON.parse(cocktails) : [];
}

export function saveCocktailToLocalStorage(cocktail: Cocktail) {
  const cocktails = getCocktailsFromLocalStorage();
  cocktails.push(cocktail);
  localStorage.setItem(CUSTOM_COCKTAILS_KEY, JSON.stringify(cocktails));
}

export function setRawCocktailsDataToLocalStorage(
  rawCocktailsData: RawCocktailsResponse[]
) {
  localStorage.setItem(
    RAW_COCKTAILS_DATA_KEY,
    JSON.stringify(rawCocktailsData)
  );
  localStorage.setItem(
    CACHE_EXPIRY_KEY,
    (Date.now() + CACHE_DURATION_MS).toString()
  );
}

export function getRawCocktailsDataFromLocalStorage() {
  const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
  if (!expiry) {
    return [];
  }

  const notYetExpired = Date.now() < parseInt(expiry);
  if (notYetExpired) {
    return JSON.parse(localStorage.getItem(RAW_COCKTAILS_DATA_KEY) || "[]");
  }

  return [];
}
