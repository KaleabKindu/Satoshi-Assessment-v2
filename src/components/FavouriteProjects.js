import React from "react";
import { useGetFavouriteProjects } from "../hooks/api";

const FavoriteProjects = () => {
  const { data:projects } = useGetFavouriteProjects()
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold">Favorite Projects</p>
      <ul className="flex flex-col gap-1 pl-2">
        {projects?.map((project) => (
          <li key={project.id} className="list-disc list-inside">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteProjects;
