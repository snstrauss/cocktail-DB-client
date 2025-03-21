import "./AddRecipe.scss";
import bem from "../../common/bem";
import Title from "../../components/Title/Title";
import UploadImage from "./components/UploadImage/UploadImage";
import { FormField } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useRef } from "react";
import { AddIngredients } from "./components/AddIngredients/AddIngredients";
import {
  getRandomCocktailThumbnail,
  requiredFieldValidation,
} from "./components/addRecipeCommons";
import { Form } from "react-final-form";
import { saveCocktailToLocalStorage } from "../../services/cocktailsLocalStorage";
import { useNavigate } from "react-router";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage";
import HomeButton from "../../components/HomeButton/HomeButton";
import { toFormattedCocktail } from "../../appState/cocktails/cocktails.hooks";
import SelectGlass from "./components/SelectGlass/SelectGlass";
import { ALCOHOLIC, CATEGORY, Glass } from "../../types/cocktails.enums";

const addRecipeClassNames = bem("add-recipe");

type RecipeFormData = {
  strDrink: string;
  strInstructions: string;
  strGlass: Glass;
  [key: `strIngredient${number}`]: string;
  [key: `strMeasure${number}`]: string;
};

export default function AddRecipe() {
  const imageUrl = useRef<string>(null);
  const successMessageRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  function getImage({ dataUrl }: { file: File; dataUrl: string }) {
    imageUrl.current = dataUrl;
  }

  function addCocktailToStorage({
    strDrink,
    strInstructions,
    strGlass,
    ...ingredients
  }: RecipeFormData) {
    saveCocktailToLocalStorage({
      ...toFormattedCocktail({
        idDrink: crypto.randomUUID().toString(),
        strDrink,
        strInstructions,
        strDrinkThumb: imageUrl.current ?? getRandomCocktailThumbnail(),
        strCategory: CATEGORY.HOMEMADE,
        strAlcoholic: ALCOHOLIC.OPTIONAL,
        strGlass: strGlass,
        ...ingredients,
      }),
      isUserCreated: true,
    });

    successMessageRef.current?.showModal();
    setTimeout(() => {
      successMessageRef.current?.close();
      navigate("/");
    }, 2000);
  }

  return (
    <div className={addRecipeClassNames()}>
      <header>
        <Title>New Cocktail</Title>
        <HomeButton />
      </header>
      <UploadImage onImageSelect={getImage} />
      <Form
        onSubmit={addCocktailToStorage}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormField
              name="strDrink"
              validate={(value) =>
                requiredFieldValidation(value, "Cocktail name is required")
              }
              placeholder="Cocktail Name"
            />
            <SelectGlass />
            <AddIngredients />
            <FormField
              name="strInstructions"
              placeholder="How to make it?"
              textArea
            />
            <Button type="submit">Add Cocktail</Button>
          </form>
        )}
      ></Form>
      <SuccessMessage ref={successMessageRef} />
    </div>
  );
}
