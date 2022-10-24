import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { projectSelector } from "../../../../app/store";

const DialogTask = ({ onClose, isDialogOpen }) => {
    const { taskDetail } = useSelector(projectSelector);
console.log(taskDetail);

  const [typeTask, setTypeTask] = useState(null);
  const open = Boolean(typeTask);
  const handleClick = (event) => {
    setTypeTask(event.currentTarget);
  };
  const handleClose = () => {
    setTypeTask(null);
  };
  return (
    <Dialog onClose={onClose} open={isDialogOpen}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {taskDetail?.taskTypeDetail?.taskType}
      </Button>
      <Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        typeTask={typeTask}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      > 
     
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu></Box>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTask;
