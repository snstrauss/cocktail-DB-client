// import { CSSProperties } from "react";
// import "./InfiniteCocktailsList.scss";
import "./VirtualCocktailsList.scss";
import { FixedSizeGrid, VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useAppSelector } from "../../../../appState/store";
import { selectAllCocktails } from "../../../../appState/cocktails/cocktails.selectors";
import CocktailLoadingSpinner from "../CocktailLoadingSpinner/CocktailLoadingSpinner";

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

  return (
    <div className="virtual-cocktails-list">
      {allCocktails.length ? (
        <h1>have {allCocktails.length} drinks</h1>
      ) : (
        <CocktailLoadingSpinner />
      )}
    </div>
  );
}
