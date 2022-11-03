import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  styled,
  ListItem,
  Avatar,
  AvatarGroup,
  Alert,
  Snackbar,
  colors,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  updateStatusTaskThunk,
  getProjectDetailThunk,
} from "../../slice/projectSlice";
import { alertCase, useAlert } from "../../../../app/hooks/alert/useAlert";
import {
  faArrowDown,
  faArrowUp,
  faCheckToSlot,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Collum = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "calc(25% - 16px)",
  backgroundColor: "#f4f5f7",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginRight: "8px",
  minHeight: "80vh",
  paddingBottom: "20px",
  paddingLeft: "8px",
}));
const TextTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  textAlign: "left",
  fontSize: "0.8125rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  marginBottom: "10px",
}));
const ListItemCss = styled(ListItem)(({ theme }) => ({
  margin: "10px 0",
  boxShadow: " #091e4240 0 1px 2px",
  backgroundColor: "#fff",
  borderRadius: "3px",
  cursor: "pointer",
  alignItems: "flex-start",
  width: "95%",
  maxWidth: 360,

  minWidth: "96%",
}));
const AvatarGroupCss = styled(AvatarGroup)(({ theme }) => ({
  justifyContent: "flex-end",
  alignItems: "center",
}));
const MemberAvatar = styled(Avatar)(({ theme }) => ({
  width: "30px",
  height: "30px",
}));
const TextTaskDetail = styled(Typography)(({ theme }) => ({
  color: "black",
}));
const BoxItemDetail = styled(Box)(({ theme }) => ({
  marginTop: "5px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));
const categoryStatusMap = {
  1: "BACKLOG",
  2: "SELECTED FOR DEVELOPMENT",
  3: "IN PROGRESS",
  4: "DONE",
};
const TaskTypeIcons = (taskType) => {
  const taskTypeData = [
    {
      taskType: "bug",
      icon: faExclamationCircle,
      color: colors.red[500],
    },
    {
      taskType: "new task",
      icon: faCheckToSlot,
      color: colors.blue[500],
    },
  ];
  const taskTypeItem = taskTypeData.find((item) => item.taskType === taskType);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: taskTypeItem.color,
        fontWeight: 500,
        width: "35%"
      }}
    >
      <FontAwesomeIcon icon={taskTypeItem.icon} />
      <Typography
        sx={{ textTransform: "capitalize" }}
        variant="caption"
        fontWeight={500}
      >
        {taskTypeItem.taskType}
      </Typography>
    </Box>
  );
};

const PriorityIcons = (priority) => {
  const priorityData = [
    {
      priority: "High",
      icon: faArrowUp,
      color: colors.red[500],
    },
    {
      priority: "Medium",
      icon: faArrowUp,
      color: colors.orange[500],
    },
    {
      priority: "Low",
      icon: faArrowDown,
      color: colors.green[500],
    },
    {
      priority: "Lowest",
      icon: faArrowDown,
      color: colors.lightBlue[500],
    },
  ];
  const priorityItem = priorityData.find((item) => item.priority === priority);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: priorityItem.color,
        fontWeight: 500,
        height: "24px",
        width: "50%",
      }}
    >
      <FontAwesomeIcon icon={priorityItem.icon} />
      <Typography sx={{ marginLeft: "2px" }}>
        {priorityItem.priority}
      </Typography>
    </Box>
  );
};
const List = ({ listTask }) => {
  const dispatch = useDispatch();
  const { alertState, dispatchAlert } = useAlert();
  const handleCloseSnack = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatchAlert({ type: alertCase.reset });
  };
  const navigate = useNavigate();
  const { projectId } = useParams();
  const GoToTask = (taskId) => {
    navigate(`/project/${projectId}/${taskId}`);
  };
  const handleDragEnd = async (result) => {
    let { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    try {
      const data = await dispatch(
        updateStatusTaskThunk({
          taskId: draggableId,
          statusId: destination.droppableId,
        })
      ).unwrap();
      dispatchAlert({ type: alertCase.success, payload: data });
      dispatch(getProjectDetailThunk(projectId));
      return data;
    } catch (error) {
      dispatchAlert({ type: alertCase.error, payload: error });
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!alertState.successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertState.successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!alertState.errorMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertState.errorMessage}
        </Alert>
      </Snackbar>
      <DragDropContext onDragEnd={handleDragEnd}>
        {listTask?.map((taskList, index) => {
          return (
            <Droppable key={index} droppableId={taskList.statusId}>
              {(provided) => {
                return (
                  <Collum>
                    <TextTitle
                      sx={(theme) => ({
                        color:
                          taskList.statusName === categoryStatusMap["1"]
                            ? theme.palette.primary.light
                            : taskList.statusName === categoryStatusMap["2"]
                            ? colors.green[500]
                            : taskList.statusName === categoryStatusMap["3"]
                            ? colors.amber[500]
                            : colors.red[500],
                      })}
                    >
                      {taskList.statusName}
                      <span style={{ marginLeft: "5px" }}>
                        ({taskList.lstTaskDeTail.length})
                      </span>
                    </TextTitle>
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ width: "100%" }}
                    >
                      {taskList?.lstTaskDeTail?.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={task.taskId.toString()}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ListItemCss>
                                    <Box
                                      onClick={() => {
                                        GoToTask(task.taskId);
                                      }}
                                      sx={{ width: "100%", minHeight: "70px" }}
                                    >
                                      <TextTaskDetail>
                                        {" "}
                                        {task?.taskName}
                                      </TextTaskDetail>
                                      <BoxItemDetail>
                                        {PriorityIcons(
                                          task?.priorityTask.priority
                                        )}
                                        {TaskTypeIcons(
                                          task?.taskTypeDetail.taskType
                                        )}
                                        <AvatarGroupCss max={2}>
                                          {task?.assigness.map((member) => (
                                            <MemberAvatar
                                              key={member.id}
                                              alt={member.name}
                                              src={member.avatar}
                                            ></MemberAvatar>
                                          ))}
                                        </AvatarGroupCss>
                                      </BoxItemDetail>
                                    </Box>
                                  </ListItemCss>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </Box>{" "}
                  </Collum>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    </>
  );
};

export default List;
