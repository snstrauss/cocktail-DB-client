type PossibleString = string | null;

type Category =
  | "Cocktail"
  | "Ordinary Drink"
  | "Punch / Party Drink"
  | "Shake"
  | "Other / Unknown"
  | "Cocoa"
  | "Shot"
  | "Coffee / Tea"
  | "Homemade Liqueur"
  | "Beer"
  | "Soft Drink"
  | null;

export type Glass =
  | "Highball glass"
  | "Old-fashioned glass"
  | "Cocktail glass"
  | "Copper Mug"
  | "Whiskey Glass"
  | "Collins glass"
  | "Pousse cafe glass"
  | "Champagne flute"
  | "Whiskey sour glass"
  | "Brandy snifter"
  | "White wine glass"
  | "Nick and Nora Glass"
  | "Hurricane glass"
  | "Coffee mug"
  | "Shot glass"
  | "Jar"
  | "Irish coffee cup"
  | "Punch bowl"
  | "Pitcher"
  | "Pint glass"
  | "Cordial glass"
  | "Beer mug"
  | "Margarita/Coupette glass"
  | "Beer pilsner"
  | "Beer Glass"
  | "Parfait glass"
  | "Wine Glass"
  | "Mason jar"
  | "Margarita glass"
  | "Martini Glass"
  | "Balloon Glass"
  | "Coupe Glass"
  | null;

type Alcoholic = "Alcoholic" | "Non alcoholic" | "Optional alcohol";

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
  rawIngredients: RawCocktailIngrediantsProps;
  isUserCreated?: boolean;
};
