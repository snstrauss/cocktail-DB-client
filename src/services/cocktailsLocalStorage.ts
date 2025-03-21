import { Cocktail } from "../types/cocktails";

export function getCocktailsFromLocalStorage() {
  const cocktails = localStorage.getItem("cocktails");
  return cocktails ? JSON.parse(cocktails) : [];
}

export function saveCocktailToLocalStorage(cocktail: Cocktail) {
  const cocktails = getCocktailsFromLocalStorage();
  cocktails.push(cocktail);
  localStorage.setItem("cocktails", JSON.stringify(cocktails));
}
