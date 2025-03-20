import "./VirtualCocktailsList.scss";
import { useMemo } from "react";
import { FixedSizeGrid } from "react-window";
import { useAppSelector } from "../../../../appState/store";
import {
  selectAllCocktails,
  selectCocktailsFetchErrorMessage,
  selectFilteredCocktails,
} from "../../../../appState/cocktails/cocktails.selectors";
import CocktailLoadingSpinner from "../../../../components/CocktailLoadingSpinner/CocktailLoadingSpinner";
import ErrorState from "../../../../components/ErrorState/ErrorState";
import bem from "../../../../common/bem";
import {
  COLUMN_WIDTH,
  COLUMNS_COUNT,
  getItemFromGridIndices,
  ROW_HEIGHT,
} from "./gridCommons";
import CocktailItem from "./CocktailItem/CocktailItem";
import { useCocktailsList } from "../../../../appState/cocktails/cocktails.hooks";

const virtualCocktailsListClassNames = bem("virtual-cocktails-list");

type VirtualCocktailsListProps = {
  className?: string;
};

export default function VirtualCocktailsList({
  className,
}: VirtualCocktailsListProps) {
  const potentialErrorMessage = useAppSelector(
    selectCocktailsFetchErrorMessage
  );

  const cocktailsList = useCocktailsList();

  const rowsCount = useMemo(
    () => Math.ceil(cocktailsList.length / COLUMNS_COUNT),
    [cocktailsList]
  );

  return (
    <div className={virtualCocktailsListClassNames.mix(className)}>
      {potentialErrorMessage ? (
        <ErrorState />
      ) : cocktailsList.length ? (
        <FixedSizeGrid
          columnCount={COLUMNS_COUNT}
          columnWidth={COLUMN_WIDTH}
          rowCount={rowsCount}
          rowHeight={ROW_HEIGHT}
          width={COLUMN_WIDTH * COLUMNS_COUNT}
          height={ROW_HEIGHT * 3.2}
          itemKey={({ rowIndex, columnIndex }) =>
            getItemFromGridIndices(cocktailsList, columnIndex, rowIndex)?.id
          }
          itemData={{ cocktailsList }}
        >
          {CocktailItem}
        </FixedSizeGrid>
      ) : (
        <CocktailLoadingSpinner />
      )}
    </div>
  );
}
