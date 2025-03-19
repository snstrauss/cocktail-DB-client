import "./HomePage.scss";
import VirtualCocktailsList from "./components/VirtualCocktailsList/VirtualCocktailsList";
import { useInitializeCocktailsList } from "../../appState/cocktails/cocktails.hooks";
import Button from "../../components/Button/Button";
import WriteIcon from "../../img/file-pen-regular.svg?react";
import bem from "../../common/bem";
import SearchInput from "./components/SearchInput/SearchInput";

const homeClassNames = bem("home-page");

export default function HomePage() {
  useInitializeCocktailsList();

  return (
    <div className={homeClassNames()}>
      <h1 className={homeClassNames("title")}>All Cocktails List</h1>
      <SearchInput />
      <VirtualCocktailsList className={homeClassNames("cocktails-list")} />
      <Button className={homeClassNames("add-button")}>
        Add <WriteIcon />
      </Button>
    </div>
  );
}
