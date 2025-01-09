import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useUpdateFavouriteProjectById } from "../hooks/api";
import FavoriteColor from "../../public/favorite-color.png";
import FavoriteOutline from "../../public/favorite-outline.png";
import CircularProgress from "@mui/material/CircularProgress";

const ToggleFavouriteButton = ({ id, isFavourite }) => {
  const [favourite, setFavourite] = useState(false);
  const { mutate, isLoading: updating } = useUpdateFavouriteProjectById();
  const handleFavouriteClick = (e) => {
    e.stopPropagation();
    mutate(
      { projectId: id, favourite: !favourite },
      {
        onSuccess: () => setFavourite(!favourite),
        onError: () => console.log("error", error),
      }
    );
  };
  useEffect(() => {
    setFavourite(isFavourite);
  }, [isFavourite]);
  return (
    <IconButton onClick={handleFavouriteClick}>
      {updating ? (
        <CircularProgress size={25} />
      ) : (
        <img
          width={30}
          height={30}
          src={favourite ? FavoriteColor : FavoriteOutline}
          alt="Favourite"
        />
      )}
    </IconButton>
  );
};

export default ToggleFavouriteButton;
