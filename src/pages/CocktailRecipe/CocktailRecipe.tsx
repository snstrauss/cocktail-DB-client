import "./CocktailRecipe.scss";
import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router";
import bem from "../../common/bem";
import { useCocktailById } from "../../appState/cocktails/cocktails.hooks";
import { selectCocktailsFetchErrorMessage } from "../../appState/cocktails/cocktails.selectors";
import { useAppSelector } from "../../appState/store";
import ErrorState from "../../components/ErrorState/ErrorState";
import { Cocktail } from "../../types/cocktails";
import Title from "../../components/Title/Title";
import HomeButton from "../../components/HomeButton/HomeButton";

function useFormattedIngredients(rawIngredients: RawCocktailIngrediantsProps) {
  return useMemo(
    () =>
      rawIngredients
        ? Object.entries<string>(rawIngredients)
            .filter(([key]) => /^strIngredient\d+$/.test(key))
            .map(([_, value], index) => {
              const ingredient = value;
              const measure: string | null =
                rawIngredients[`strMeasure${index + 1}`];

              if (ingredient) {
                return `${measure ? `${measure} ` : ""}${ingredient}`;
              }
            })
            .filter(Boolean)
        : [],
    [rawIngredients]
  );
}

const cocktailRecipeClassName = bem("cocktail-recipe");

type CocktailRecipeProps = {
  cocktail: Cocktail;
};

function CocktailRecipe({ cocktail }: CocktailRecipeProps) {
  const { name, thumbnail, rawIngredients, instructions, extraDetails } =
    cocktail;
  const { glass } = extraDetails;

  const formattedIngredients = useFormattedIngredients(rawIngredients);

  return (
    <>
      <header>
        <Title className={cocktailRecipeClassName("title")}>{name}</Title>
        <HomeButton className={cocktailRecipeClassName("home")} />
      </header>
      <div className={cocktailRecipeClassName("content")}>
        <img
          src={thumbnail}
          className={cocktailRecipeClassName("thumbnail")}
          alt={name}
        />
        <div className={cocktailRecipeClassName("instructions")}>
          <section>
            <h2>Ingredients</h2>
            <ul>
              {formattedIngredients.map((ingredientEntry) => {
                if (!ingredientEntry) return null;

                return (
                  <li key={ingredientEntry}>
                    <span>{ingredientEntry}</span>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h2>Instructions</h2>
            <p>Glass: {glass}</p>
            <p>{instructions}</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default function CocktailRecipePage() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const isUserCreated = searchParams.get("isUserCreated") === "true";

  const potentialErrorMessage = useAppSelector(
    selectCocktailsFetchErrorMessage
  );
  const cocktail = useCocktailById(params.cocktailId ?? "", isUserCreated);

  return (
    <div className={cocktailRecipeClassName()}>
      {potentialErrorMessage || !cocktail ? (
        <ErrorState />
      ) : (
        <CocktailRecipe cocktail={cocktail} />
      )}
    </div>
  );
}
