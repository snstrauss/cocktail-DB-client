import "./ErrorState.scss";
import BrokenGlass from "../../../../img/wine-glass-crack-regular.svg?react";

const size = 100;

export default function ErrorState() {
  return (
    <div className="error-state">
      <h1>Error fetching cocktails</h1>
      <BrokenGlass width={size} height={size} />
    </div>
  );
}
