import React, { useContext, useState } from "react";
import {
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { WorkoutContext } from "../context/workoutContext";

const style = {
  dialog: {
    "&. MuiPaperRoot": {
      backgroundColor: "red",
    },
  },
};
const SeeMoreDialog = ({ handleClose, isOpen, name }) => {
  const seeMoreOption = ["Remove exercise"];
  const { handleClickDialog } = useContext(WorkoutContext);

  return (
    <Dialog style={style.dialog} open={isOpen} onClose={handleClose}>
      <List>
        {seeMoreOption &&
          seeMoreOption.map((item, index) => (
            <ListItem key={index} component="div" disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClose();
                  handleClickDialog(name);
                }}
              >
                <ListItemIcon>
                  <RemoveCircleIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
};

export default SeeMoreDialog;
