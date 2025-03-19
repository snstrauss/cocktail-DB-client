import "./CommonPageLayout.scss";
import bem from "../../common/bem";
import { Outlet } from "react-router";
import useResponsiveDetection from "../../hooks/useResponsiveDetection";

const layoutClassNames = bem("common-page-layout");

export default function CommonPageLayout() {
  const { isMobile } = useResponsiveDetection();

  return (
    <div className={layoutClassNames({ "on-mobile": isMobile })}>
      <Outlet />
    </div>
  );
}
