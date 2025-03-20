import { useRef, useState } from "react";
import { Cocktail } from "../../../../types/cocktails";

export const COLUMNS_COUNT = 2;
export const ROW_HEIGHT = 200;
export const COLUMN_WIDTH = 180;

export const getItemFromGridIndices = (
  allCocktails: Cocktail[],
  columnIndex: number,
  rowIndex: number
): Cocktail => allCocktails[rowIndex * COLUMNS_COUNT + columnIndex];

export function useGridScrollPosition() {
  const ref = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  function onScroll() {
    const element = ref.current;
    if (!element) return;
    setIsAtTop(element.scrollTop === 0);
    setIsAtBottom(
      element.scrollTop + element.clientHeight >= element.scrollHeight
    );
  }

  return { ref, isAtTop, isAtBottom, onScroll };
}
