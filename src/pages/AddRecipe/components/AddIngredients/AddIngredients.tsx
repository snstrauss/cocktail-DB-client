import "./AddIngredients.scss";
import bem from "../../../../common/bem";
import { FormField } from "../../../../components/Input/Input";
import PlusIcon from "../../../../img/plus-solid.svg?react";
import { requiredFieldValidation } from "../addRecipeCommons";
import { useState } from "react";

const addIngredients = "add-ingredients";
const addIngredientsClassNames = bem(addIngredients);
const ingredientFieldClassNames = bem(`${addIngredients}__ingredient-field`);

export function AddIngredients() {
  const [ingredientsCounts, setIngredientsCounts] = useState(1);

  function addIngredient() {
    setIngredientsCounts(ingredientsCounts + 1);
  }

  return (
    <div className={addIngredientsClassNames()}>
      {Array.from({ length: ingredientsCounts }).map((_, index) => {
        const ingredientName = `ingredients${index}`;

        return (
          <div className={ingredientFieldClassNames()} key={ingredientName}>
            <FormField
              name={`measure${index}`}
              placeholder="Measure"
              className={ingredientFieldClassNames("measure")}
            />
            <FormField
              name={ingredientName}
              validate={(value) =>
                requiredFieldValidation(value, "Ingredient is required")
              }
              placeholder="Ingredient"
              className={ingredientFieldClassNames("ingredient")}
            />
          </div>
        );
      })}
      <span className={addIngredientsClassNames("add")} onClick={addIngredient}>
        Another Ingredient <PlusIcon />
      </span>
    </div>
  );
}
