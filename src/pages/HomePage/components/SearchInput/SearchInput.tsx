import "./SearchInput.scss";
import bem from "../../../../common/bem";
import Input from "../../../../components/Input/Input";
import SearchIcon from "../../../../img/magnifying-glass-solid.svg?react";

type SearchInputProps = {
  className?: string;
};

const searchInputClassNames = bem("search-input");

export default function SearchInput({ className }: SearchInputProps) {
  return (
    <Input
      className={searchInputClassNames.mix(className)}
      placeholder="What are you drinking?"
      Icon={SearchIcon}
    />
  );
}
