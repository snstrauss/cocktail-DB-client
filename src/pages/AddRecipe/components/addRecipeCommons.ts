import placeholder1 from "../../../img/cocktails-image-placeholders/drink-placeholder-1.png";
import placeholder2 from "../../../img/cocktails-image-placeholders/drink-placeholder-2.png";
import placeholder3 from "../../../img/cocktails-image-placeholders/drink-placeholder-3.png";
import placeholder4 from "../../../img/cocktails-image-placeholders/drink-placeholder-4.png";
import placeholder5 from "../../../img/cocktails-image-placeholders/drink-placeholder-5.png";
import placeholder6 from "../../../img/cocktails-image-placeholders/drink-placeholder-6.png";
import placeholder7 from "../../../img/cocktails-image-placeholders/drink-placeholder-7.png";
import placeholder8 from "../../../img/cocktails-image-placeholders/drink-placeholder-8.png";
import placeholder9 from "../../../img/cocktails-image-placeholders/drink-placeholder-9.png";
import placeholder10 from "../../../img/cocktails-image-placeholders/drink-placeholder-10.png";

const cocktailPlaceholders = [
  placeholder1,
  placeholder2,
  placeholder3,
  placeholder4,
  placeholder5,
  placeholder6,
  placeholder7,
  placeholder8,
  placeholder9,
  placeholder10,
];

export function getRandomCocktailThumbnail() {
  const randomIndex = Math.floor(Math.random() * cocktailPlaceholders.length);
  return cocktailPlaceholders[randomIndex];
}

export function requiredFieldValidation(value: string, errorMessage: string) {
  if (!value) {
    return errorMessage;
  }
}
