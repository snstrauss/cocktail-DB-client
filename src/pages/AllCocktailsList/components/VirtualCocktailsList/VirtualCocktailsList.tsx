// import { CSSProperties } from "react";
// import "./InfiniteCocktailsList.scss";
import "./VirtualCocktailsList.scss";
import { FixedSizeGrid, VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useAppSelector } from "../../../../appState/store";
import {
  selectAllCocktails,
  selectHasCocktailsFetchError,
} from "../../../../appState/cocktails/cocktails.selectors";
import CocktailLoadingSpinner from "../CocktailLoadingSpinner/CocktailLoadingSpinner";
import ErrorState from "../ErrorState/ErrorState";

function CocktailItem({
  columnIndex,
  rowIndex,
  style,
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}) {
  debugger;

  return (
    <div className="cocktail-item" style={style}>
      <h3>Cocktail {rowIndex}</h3>
    </div>
  );
}

const COLUMNS_COUNT = 3;
const ROW_HEIGHT = 100;
const COLUMN_WIDTH = 200;

export default function VirtualCocktailsList() {
  const allCocktails = useAppSelector(selectAllCocktails);
  const hasError = useAppSelector(selectHasCocktailsFetchError);

  return (
    <div className="virtual-cocktails-list">
      {allCocktails.length ? (
        <h1>have {allCocktails.length} drinks</h1>
      ) : hasError ? (
        <ErrorState />
      ) : (
        <CocktailLoadingSpinner />
      )}
    </div>
  );
}
