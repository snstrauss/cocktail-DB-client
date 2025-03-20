import { Cocktail } from "../../../../types/cocktails";

export const COLUMNS_COUNT = 2
export const ROW_HEIGHT = 200;
export const COLUMN_WIDTH = 180;

export const getItemFromGridIndices = (
  allCocktails: Cocktail[],
  columnIndex: number,
  rowIndex: number
): Cocktail => allCocktails[rowIndex * COLUMNS_COUNT + columnIndex];
