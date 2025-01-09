import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SideBar from "./SideBar";

const MobileDrawer = (props) => {
  // State to manage the open/close status of the drawer
  const [open, setOpen] = useState(false);

  // Function to handle opening the drawer
  const handleOpen = () => setOpen(true);

  // Function to handle closing the drawer
  const handleClose = () => setOpen(false);

  return (
    <div className="md:hidden">
      {/* Button to open the drawer */}
      <IconButton onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      {/* Drawer component */}
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <div className="flex flex-col p-2">
          <div className="flex justify-end">
            {/* Button to close the drawer */}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {/* Content inside the drawer */}
          <div>Mobile Drawer</div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
