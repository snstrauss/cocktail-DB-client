import "./AddRecipe.scss";
import bem from "../../common/bem";
import Title from "../../components/Title/Title";
import UploadImage from "./components/UploadImage/UploadImage";
import { FormField } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useRef } from "react";
import { AddIngredients } from "./components/AddIngredients/AddIngredients";
import { requiredFieldValidation } from "./components/addRecipeCommons";
import { Form } from "react-final-form";

const addRecipeClassNames = bem("add-recipe");

type RecipeFormData = {
  name: string;
  instructions: string;
  [key: `ingredient${number}`]: string;
  [key: `measure${number}`]: string;
}

export default function AddRecipe() {
  const imageUrl = useRef<string>(null);

  function getImage({ dataUrl }: { file: File; dataUrl: string }) {
    imageUrl.current = dataUrl;
  }

  function addCocktailToStorage(data: RecipeFormData) {
    console.log(imageUrl.current);
    console.log(data);
    debugger;
  }

  return (
    <div className={addRecipeClassNames()}>
      <Title>New Cocktail</Title>
      <UploadImage onImageSelect={getImage} />
      <Form
        onSubmit={addCocktailToStorage}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormField
              name="name"
              validate={(value) =>
                requiredFieldValidation(value, "Cocktail name is required")
              }
              placeholder="Cocktail Name"
            />
            <AddIngredients />
            <FormField
              name="instructions"
              placeholder="How to make it?"
              textArea
            />
            <Button type="submit">Add Cocktail</Button>
          </form>
        )}
      ></Form>
    </div>
  );
}
