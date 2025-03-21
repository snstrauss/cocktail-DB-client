export const CATEGORY = {
  COCKTAIL: "Cocktail",
  ORDINARY: "Ordinary Drink",
  PUNCH: "Punch / Party Drink",
  SHAKE: "Shake",
  OTHER: "Other / Unknown",
  COCOA: "Cocoa",
  SHOT: "Shot",
  COFFEE: "Coffee / Tea",
  HOMEMADE: "Homemade Liqueur",
  BEER: "Beer",
  SOFT: "Soft Drink",
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

export const GLASS = {
  HIGHBALL: "Highball glass",
  OLD_FASHIONED: "Old-fashioned glass",
  COCKTAIL: "Cocktail glass",
  COPPER_MUG: "Copper Mug",
  WHISKEY: "Whiskey Glass",
  COLLINS: "Collins glass",
  POUSS_CAFE: "Pousse cafe glass",
  CHAMPAGNE_FLUTE: "Champagne flute",
  WHISKEY_SOUR: "Whiskey sour glass",
  BRANDY_SNIFTER: "Brandy snifter",
  WHITE_WINE: "White wine glass",
  NICK_AND_NORA: "Nick and Nora Glass",
  HURRICANE: "Hurricane glass",
  COFFEE_MUG: "Coffee mug",
  SHOT: "Shot glass",
  JAR: "Jar",
  IRISH_COFFEE_CUP: "Irish coffee cup",
  PUNCH_BOWL: "Punch bowl",
  PITCHER: "Pitcher",
  PINT: "Pint glass",
  CORIDAL: "Cordial glass",
  BEER_MUG: "Beer mug",
  MARGARITA_COUPE: "Margarita/Coupette glass",
  BEER_PILSNER: "Beer pilsner",
  BEER: "Beer Glass",
  PARFAIT: "Parfait glass",
  WINE: "Wine Glass",
  MASON_JAR: "Mason jar",
  MARGARITA: "Margarita glass",
  MARTINI: "Martini Glass",
  BALLOON: "Balloon Glass",
  COUPE: "Coupe Glass",
} as const;

export type Glass = (typeof GLASS)[keyof typeof GLASS];

export const ALCOHOLIC = {
  ALCOHOLIC: "Alcoholic",
  NONE: "Non alcoholic",
  OPTIONAL: "Optional alcohol",
} as const;

export type Alcoholic = (typeof ALCOHOLIC)[keyof typeof ALCOHOLIC];