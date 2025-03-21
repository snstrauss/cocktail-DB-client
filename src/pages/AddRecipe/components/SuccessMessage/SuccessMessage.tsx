import "./SuccessMessage.scss";
import bem from "../../../../common/bem";
import { forwardRef, Ref } from "react";
import Title from "../../../../components/Title/Title";

const successMessageClassNames = bem("success-message");

export default forwardRef(function SuccessMessage(
  _,
  ref: Ref<HTMLDialogElement>
) {
  return (
    <dialog className={successMessageClassNames()} ref={ref} open={false}>
      <Title>New Cocktail Added</Title>
      <h2>
        Your cocktail has been added to the database. You can now view it on the
        home page.
      </h2>
    </dialog>
  );
});
