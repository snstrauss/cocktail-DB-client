import { Category, Glass, Alcoholic } from "./cocktails.enums";

type PossibleString = string | null;

type RawCocktailIngredientsProps = {
  [key: `strIngredient${number}`]: PossibleString;
  [key: `strMeasure${number}`]: PossibleString;
};

export type RawCocktailData = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: PossibleString;
  strCategory: Category;
  strAlcoholic: Alcoholic;
  strGlass: Glass;
} & RawCocktailIngredientsProps;

export type RawCocktailsResponse = {
  drinks: RawCocktailData[];
};

export type Cocktail = {
  id: string;
  name: string;
  thumbnail: string;
  instructions: PossibleString;
  extraDetails: {
    category: Category;
    alcoholic: Alcoholic;
    glass: Glass;
  };
  rawIngredients: RawCocktailIngredientsProps;
  isUserCreated?: boolean;
};
