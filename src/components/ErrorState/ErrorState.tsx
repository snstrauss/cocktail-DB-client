import "./ErrorState.scss";
import BrokenGlass from "../../img/wine-glass-crack-regular.svg?react";
import { useAppSelector } from "../../appState/store";
import { selectCocktailsFetchErrorMessage } from "../../appState/cocktails/cocktails.selectors";

const size = 100;

export default function ErrorState() {
  const errorMessage = useAppSelector(selectCocktailsFetchErrorMessage);

  return (
    <div className="error-state">
      <h1>{errorMessage}</h1>
      <BrokenGlass width={size} height={size} />
    </div>
  );
}
