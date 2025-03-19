import "./CocktailRecipe.scss";
import { useParams } from "react-router";
import { useCocktailById } from "../../appState/cocktails/cocktails.hooks";
import { selectCocktailsFetchErrorMessage } from "../../appState/cocktails/cocktails.selectors";
import { useAppSelector } from "../../appState/store";
import ErrorState from "../../components/ErrorState/ErrorState";

export default function CocktailRecipe() {
  const params = useParams();

  const potentialErrorMessage = useAppSelector(
    selectCocktailsFetchErrorMessage
  );
  const cocktail = useCocktailById(params.cocktailId ?? "");

  return (
    <div className="cocktail-recipe">
      {potentialErrorMessage ? (
        <ErrorState />
      ) : (
        <>
          <h1>Cocktail Recipe</h1>
          <h2>{cocktail?.name}</h2>
        </>
      )}
    </div>
  );
}
