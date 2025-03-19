import { Cocktail } from "../../../../types/cocktails";

export const COLUMNS_COUNT = 2
export const ROW_HEIGHT = 100;
export const COLUMN_WIDTH = 200;

export const getItemFromGridIndices = (
  allCocktails: Cocktail[],
  columnIndex: number,
  rowIndex: number
): Cocktail => allCocktails[rowIndex * COLUMNS_COUNT + columnIndex];
