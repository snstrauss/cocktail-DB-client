import { RawCocktailData } from "../types/cocktails";

export function getCocktailsFromLocalStorage() {
  const cocktails = localStorage.getItem("cocktails");
  return cocktails ? JSON.parse(cocktails) : [];
}

type LimitedCocktailData = Pick<
  RawCocktailData,
  "idDrink" | "strDrink" | "strDrinkThumb" | "strInstructions"
>;
export function saveCocktailToLocalStorage(cocktail: LimitedCocktailData) {
  const cocktails = getCocktailsFromLocalStorage();
  cocktails.push(cocktail);
  localStorage.setItem("cocktails", JSON.stringify(cocktails));
}
