import "./Title.scss";
import bem from "../../common/bem";

const titleClassNames = bem("title");

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className }: TitleProps) {
  return <h1 className={titleClassNames.mix(className)}>{children}</h1>;
}
