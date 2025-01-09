import React, { useMemo } from "react";
import MobileDrawer from "./MobileDrawer";
import { useLocation, useParams } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const { id } = useParams();
  const header = useMemo(() => {
    if (location.pathname === "/projects") {
      return "Project List Page";
    } else if (location.pathname === "/projects/new") {
      return "Project Create Page";
    } else if (location.pathname.includes("edit")) {
      return "Project Edit Page";
    } else if (id) {
      return "Project Detail Page";
    }
  }, [location, id]);
  return (
    <div className="flex justify-between">
      <p className="font-bold">{header}</p>
      <MobileDrawer />
    </div>
  );
};

export default Header;
