import React from "react";
import FavoriteProjects from "./FavouriteProjects";

const SideBar = () => {
  return (
    <div className="hidden md:block w-[400px] h-full pt-8 md:pt-16 p-2 md:p-5 bg-white">
      <FavoriteProjects/>
    </div>
  );
};

export default SideBar;
