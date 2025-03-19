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

function useCocktailsList() {
  const allCocktails = useAppSelector(selectAllCocktails);
  const filteredCocktails = useAppSelector(selectFilteredCocktails);

  return useMemo(
    () => (filteredCocktails.length ? filteredCocktails : allCocktails),
    [filteredCocktails, allCocktails]
  );
}

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

  console.log(`%crows - ${rowsCount}`, `font-size: 35px; color: dodgerblue;`);

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
          width={window.innerWidth * 0.9}
          height={window.innerHeight * 0.5}
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
