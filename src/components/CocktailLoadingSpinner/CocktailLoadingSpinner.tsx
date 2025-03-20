import "./CocktailLoadingSpinner.scss";
import CocktailIcon from "../../img/martini-glass-citrus-solid.svg?react";
import bem from "../../common/bem";

const cocktailLoadingSpinnerClassNames = bem("cocktail-loading-spinner");

export default function CocktailLoadingSpinner() {
  return (
    <div className={cocktailLoadingSpinnerClassNames()}>
      <CocktailIcon />
    </div>
  );
}
