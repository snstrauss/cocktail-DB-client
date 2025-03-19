import "./VirtualCocktailsList.scss";
import { CSSProperties, useMemo } from "react";
import { FixedSizeGrid } from "react-window";
import { useAppSelector } from "../../../../appState/store";
import {
  selectAllCocktails,
  selectHasCocktailsFetchError,
} from "../../../../appState/cocktails/cocktails.selectors";
import CocktailLoadingSpinner from "../../../../components/CocktailLoadingSpinner/CocktailLoadingSpinner";
import ErrorState from "../../../../components/ErrorState/ErrorState";
import bem from "../../../../common/bem";
import { Cocktail } from "../../../../types/cocktails";

const COLUMNS_COUNT = 3;
const ROW_HEIGHT = 100;
const COLUMN_WIDTH = 200;

const getItemFromGridIndices = (
  allCocktails: Cocktail[],
  columnIndex: number,
  rowIndex: number
): Cocktail => allCocktails[rowIndex * COLUMNS_COUNT + columnIndex];

const itemClassNames = bem("cocktail-item");

type CocktailItemProps = {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: { allCocktails: Cocktail[] };
};

function CocktailItem({
  columnIndex,
  rowIndex,
  style,
  data,
}: CocktailItemProps) {
  const { allCocktails } = data;
  const cocktail = useMemo(
    () => getItemFromGridIndices(allCocktails, columnIndex, rowIndex),
    [allCocktails, columnIndex, rowIndex]
  );

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

const virtualCocktailsListClassNames = bem("virtual-cocktails-list");

type VirtualCocktailsListProps = {
  className?: string;
};

export default function VirtualCocktailsList({
  className,
}: VirtualCocktailsListProps) {
  const allCocktails = useAppSelector(selectAllCocktails);
  const hasError = useAppSelector(selectHasCocktailsFetchError);

  const rowsCount = useMemo(
    () => Math.ceil(allCocktails.length / COLUMNS_COUNT),
    [allCocktails]
  );

  return (
    <div className={virtualCocktailsListClassNames.mix(className)}>
      {allCocktails.length ? (
        <FixedSizeGrid
          columnCount={COLUMNS_COUNT}
          columnWidth={COLUMN_WIDTH}
          rowCount={rowsCount}
          rowHeight={ROW_HEIGHT}
          width={window.innerWidth * 0.9}
          height={window.innerHeight * 0.5}
          itemKey={({ rowIndex, columnIndex }) =>
            getItemFromGridIndices(allCocktails, columnIndex, rowIndex).id
          }
          itemData={{ allCocktails }}
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
