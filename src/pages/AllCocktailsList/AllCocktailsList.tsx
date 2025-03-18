import "./AllCocktailsList.scss";
import VirtualCocktailsList from "./components/VirtualCocktailsList/VirtualCocktailsList";
import { useInitializeCocktailsList } from "../../appState/cocktails/cocktails.hooks";

export default function AllCocktailsList() {
  useInitializeCocktailsList();

  return (
    <div className="all-cocktails-list">
      <h1>All Cocktails List</h1>
      <VirtualCocktailsList />
    </div>
  );
}
