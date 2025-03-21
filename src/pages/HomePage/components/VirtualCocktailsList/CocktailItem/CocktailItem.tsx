import { CSSProperties, useMemo } from "react";
import bem from "../../../../../common/bem";
import "./CocktailItem.scss";
import { getItemFromGridIndices } from "../gridCommons";
import { Cocktail } from "../../../../../types/cocktails";
import { useNavigate } from "react-router";

const itemClassNames = bem("cocktail-item");

type CocktailItemProps = {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: { cocktailsList: Cocktail[] };
};

export default function CocktailItem({
  columnIndex,
  rowIndex,
  style,
  data,
}: CocktailItemProps) {
  const navigate = useNavigate();

  const { cocktailsList } = data;
  const cocktail = useMemo(
    () => getItemFromGridIndices(cocktailsList, columnIndex, rowIndex),
    [cocktailsList, columnIndex, rowIndex]
  );

  if (!cocktail) {
    return null;
  }

  const { id, name, thumbnail, isUserCreated } = cocktail;

  function goToCocktailRecipe() {
    navigate(`/recipe/${id}?isUserCreated=${isUserCreated}`);
  }

  return (
    <div
      className={itemClassNames()}
      onClick={goToCocktailRecipe}
      style={style}
    >
      <img src={thumbnail} alt={name} className={itemClassNames("thumbnail")} />
      <h3 className={itemClassNames("name")}>{name}</h3>
    </div>
  );
}
