import { useParams } from "react-router";
import "./CocktailRecipe.scss";

export default function CocktailRecipe() {

  const params = useParams();

  return (
    <div className="cocktail-recipe">
      <h1>Cocktail Recipe</h1>
      <h2>{params.drink}</h2>
    </div>
  );
}
