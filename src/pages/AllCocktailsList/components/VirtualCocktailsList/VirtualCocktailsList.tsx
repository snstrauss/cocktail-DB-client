import "./VirtualCocktailsList.scss";
import { CSSProperties, useMemo } from "react";
import { FixedSizeGrid } from "react-window";
import { useAppSelector } from "../../../../appState/store";
import {
  selectAllCocktails,
  selectHasCocktailsFetchError,
} from "../../../../appState/cocktails/cocktails.selectors";
import CocktailLoadingSpinner from "../CocktailLoadingSpinner/CocktailLoadingSpinner";
import ErrorState from "../ErrorState/ErrorState";
import bem from "../../../../common/bem";

const COLUMNS_COUNT = 3;
const ROW_HEIGHT = 100;
const COLUMN_WIDTH = 200;

type ItemFromStateProps = {
  columnIndex: number;
  rowIndex: number;
};

function useItemFromGridIndices({ columnIndex, rowIndex }: ItemFromStateProps) {
  const allCocktails = useAppSelector(selectAllCocktails);

  return useMemo(
    () => allCocktails[rowIndex * COLUMNS_COUNT + columnIndex],
    [allCocktails, columnIndex, rowIndex]
  );
}

const itemClassNames = bem("cocktail-item");

function CocktailItem({
  columnIndex,
  rowIndex,
  style,
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}) {
  const cocktail = useItemFromGridIndices({ columnIndex, rowIndex });

  return (
    <div
      className={itemClassNames({
        empty: !cocktail,
      })}
      style={style}
    >
      <h3 className={itemClassNames("title")}>{cocktail?.name ?? "NOPE"}</h3>
    </div>
  );
}

export default function VirtualCocktailsList() {
  const allCocktails = useAppSelector(selectAllCocktails);
  const hasError = useAppSelector(selectHasCocktailsFetchError);

  const rowsCount = useMemo(
    () => Math.ceil(allCocktails.length / COLUMNS_COUNT),
    [allCocktails]
  );

  return (
    <div className="virtual-cocktails-list">
      {allCocktails.length ? (
        <FixedSizeGrid
          columnCount={COLUMNS_COUNT}
          columnWidth={COLUMN_WIDTH}
          rowCount={rowsCount}
          rowHeight={ROW_HEIGHT}
          width={window.innerWidth * 0.9}
          height={window.innerHeight * 0.8}
        >
          {CocktailItem}
        </FixedSizeGrid>
      ) : hasError ? (
        <ErrorState />
      ) : (
        <CocktailLoadingSpinner />
      )}
    </div>
  );
}
