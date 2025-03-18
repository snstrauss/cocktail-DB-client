import "./CocktailLoadingSpinner.scss";
import CocktailIcon from "../../../../img/martini-glass-citrus-solid.svg?react";

const size = 100;

export default function CocktailLoadingSpinner() {
  return (
    <CocktailIcon
      className="cocktail-loading-spinner"
      width={size}
      height={size}
    />
  );
}
