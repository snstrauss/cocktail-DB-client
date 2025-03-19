import "./SearchInput.scss";
import bem from "../../../../common/bem";
import Input from "../../../../components/Input/Input";
import SearchIcon from "../../../../img/magnifying-glass-solid.svg?react";
import { useDebouncedCocktailsSearch } from "../../../../appState/cocktails/cocktails.hooks";

type SearchInputProps = {
  className?: string;
};

const searchInputClassNames = bem("search-input");

export default function SearchInput({ className }: SearchInputProps) {
  const debouncedSearch = useDebouncedCocktailsSearch();

  return (
    <Input
      className={searchInputClassNames.mix(className)}
      placeholder="What are you drinking?"
      Icon={SearchIcon}
      onChange={debouncedSearch}
    />
  );
}
