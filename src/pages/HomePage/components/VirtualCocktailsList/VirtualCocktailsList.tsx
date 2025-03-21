import "./VirtualCocktailsList.scss";
import { useMemo } from "react";
import { FixedSizeGrid } from "react-window";
import { useAppSelector } from "../../../../appState/store";
import { selectCocktailsFetchErrorMessage } from "../../../../appState/cocktails/cocktails.selectors";
import CocktailLoadingSpinner from "../../../../components/CocktailLoadingSpinner/CocktailLoadingSpinner";
import ErrorState from "../../../../components/ErrorState/ErrorState";
import bem from "../../../../common/bem";
import {
  COLUMN_WIDTH,
  getItemFromGridIndices,
  ROW_HEIGHT,
  useGridScrollPosition,
  useResponsiveColumnsCount,
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

  const columnsCount = useResponsiveColumnsCount();

  const cocktailsList = useCocktailsList();

  const rowsCount = useMemo(
    () => Math.ceil(cocktailsList.length / columnsCount),
    [cocktailsList, columnsCount]
  );

  const { ref, onScroll, isAtTop, isAtBottom } = useGridScrollPosition();

  return (
    <div
      className={virtualCocktailsListClassNames({
        "top-fade": !isAtTop,
        "bottom-fade": !isAtBottom,
      }).mix(className)}
    >
      {potentialErrorMessage ? (
        <ErrorState />
      ) : cocktailsList.length ? (
        <FixedSizeGrid
          columnCount={columnsCount}
          columnWidth={COLUMN_WIDTH}
          rowCount={rowsCount}
          rowHeight={ROW_HEIGHT}
          width={COLUMN_WIDTH * columnsCount}
          height={ROW_HEIGHT * 3.2}
          itemKey={({ rowIndex: row, columnIndex: column }) =>
            getItemFromGridIndices({
              cocktailsList,
              columnsCount,
              column,
              row,
            })?.id
          }
          itemData={{ cocktailsList }}
          outerRef={ref}
          onScroll={onScroll}
          className={virtualCocktailsListClassNames("grid")}
        >
          {CocktailItem}
        </FixedSizeGrid>
      ) : (
        <CocktailLoadingSpinner />
      )}
    </div>
  );
}
