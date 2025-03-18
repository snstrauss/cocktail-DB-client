import "./CommonPageLayout.scss";
import { Outlet } from "react-router";

export default function CommonPageLayout() {
  return (
    <div className="common-page-layout">
      <Outlet />
    </div>
  );
}
