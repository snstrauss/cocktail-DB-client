import { useRef, useState } from "react";
import { Cocktail } from "../../../../types/cocktails";
import useResponsiveDetection from "../../../../hooks/useResponsiveDetection";

export function useResponsiveColumnsCount() {
  const { isMobile } = useResponsiveDetection();
  return isMobile ? 2 : 7;
}

export const ROW_HEIGHT = 200;
export const COLUMN_WIDTH = 180;

type getItemParams = {
  cocktailsList: Cocktail[];
  columnsCount: number;
  column: number;
  row: number;
};

export const getItemFromGridIndices = ({
  cocktailsList,
  columnsCount,
  column,
  row,
}: getItemParams): Cocktail => cocktailsList[row * columnsCount + column];

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
