import "./SelectGlass.scss";
import { Field } from "react-final-form";
import { GLASS } from "../../../../types/cocktails.enums";
import bem from "../../../../common/bem";

const selectGlassClassNames = bem("select-glass");

export default function SelectGlass() {
  return (
    <Field
      name="strGlass"
      // placeholder="Pick a glass"
      component="select"
      className={selectGlassClassNames()}
    >
      <option value="">Pick a glass</option>
      {Object.values(GLASS).map((glass) => (
        <option key={glass} value={glass}>
          {glass}
        </option>
      ))}
    </Field>
  );
}
