import "./HomeButton.scss";
import { useNavigate } from "react-router";
import bem from "../../common/bem";
import HouseIcon from "../../img/house-regular.svg?react";

const homeButtonClassNames = bem("home-button");

type HomeButtonProps = {
  className?: string;
};

export default function HomeButton({ className }: HomeButtonProps) {
  const navigate = useNavigate();
  function goHome() {
    navigate("/");
  }

  return (
    <HouseIcon
      className={homeButtonClassNames.mix(className)}
      onClick={goHome}
    />
  );
}
