import React, { Fragment, useState } from "react";
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  AvatarGroup,
  styled,
  Box,
  Modal,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchTaskThunk } from "../../slice/projectSlice";

const ListItemCss = styled(ListItem)(({ theme }) => ({
  marginBottom: "5px",
  width: "95%",
  maxWidth: 360,
  boxShadow: " #091e4240 0 1px 2px",
  backgroundColor: "#fff",
  borderRadius: "3px",
  cursor: "pointer",
  alignItems: "flex-start",
  width: "95%",
  maxWidth: 360,
  height: "150px",
}));
const AvatarGroupCss = styled(AvatarGroup)(({ theme }) => ({
  flexDirection: "column-reverse",
  marginLeft: "0px",
  alignItems: "flex-end",
}));
const MemberAvatar = styled(Avatar)(({ theme }) => ({
  marginBottom: "-8px",
}));
const TextTaskDetail = styled(Typography)(({ theme }) => ({
  color: "black",
}));
const Card = ({ taskDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectId } = useParams();
 
  const GoToTask = (taskId) => {
    
   
    // dispatch(getSearchTaskThunk(taskId));
    navigate(`/project/${projectId}/${taskId}`);
  };

  return (
    <Fragment>


      {taskDetail?.map((task) => (
        <Fragment key={task.taskId}>
          <ListItemCss>
            <ListItemAvatar sx={{ marginLeft: "-20px" }}>
              <AvatarGroupCss max={3}>
                {task?.assigness.map((member) => (
                  <MemberAvatar
                    style={{ marginLeft: "0px" }}
                    key={member.id}
                    alt={member.name}
                    src={member.avatar}
                  ></MemberAvatar>
                ))}
              </AvatarGroupCss>
            </ListItemAvatar>
            <Box>
              <TextTaskDetail>Name: ${task?.taskName}</TextTaskDetail>
              <TextTaskDetail>
                Priority: {task?.priorityTask.priority}
              </TextTaskDetail>
              <TextTaskDetail>
                Type: {task?.taskTypeDetail.taskType}
              </TextTaskDetail>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    GoToTask(task?.taskId);
                  }}
                >
                  Details
                </Button>
              </div>
            </Box>
          </ListItemCss>

          <Divider />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Card;
