import "./HomePage.scss";
import VirtualCocktailsList from "./components/VirtualCocktailsList/VirtualCocktailsList";
import { useInitializeCocktailsList } from "../../appState/cocktails/cocktails.hooks";
import Button from "../../components/Button/Button";
import WriteIcon from "../../img/file-pen-regular.svg?react";
import bem from "../../common/bem";
import SearchInput from "./components/SearchInput/SearchInput";
import Title from "../../components/Title/Title";
import { useNavigate } from "react-router";
const homeClassNames = bem("home-page");

export default function HomePage() {
  const navigate = useNavigate();

  useInitializeCocktailsList();

  function addNewRecipe() {
    navigate("/add");
  }

  return (
    <div className={homeClassNames()}>
      <Title>CocktailsDB</Title>
      <SearchInput />
      <VirtualCocktailsList className={homeClassNames("cocktails-list")} />
      <Button onClick={addNewRecipe} large>
        Add <WriteIcon />
      </Button>
    </div>
  );
}
