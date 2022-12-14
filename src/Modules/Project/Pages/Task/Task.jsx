import {
  Grid,
  styled,
  Box,
  Typography,
  Button,
  colors,
  Chip,
  InputLabel,
  alpha,
  Avatar,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { projectSelector, authSelector } from "../../../../app/store";
import { Editor } from "@tinymce/tinymce-react";
import {
  getSearchTaskThunk,
  updateTaskThunk,
  removeTaskThunk,
  getCommentThunk,
  insertCommentThunk,
} from "../../slice/projectSlice";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRequest } from "../../../../app/hooks/request/useRequest";
import typeTaskList from "../../../../app/apis/typeTaskList/typeTaskList";
import statusList from "../../../../app/apis/statusList/statusList";
import priorityList from "../../../../app/apis/priorityList/priorityList";
import MembersTask from "../../Components/MembersTask/MembersTask";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Comment from "../../Components/Comment/";

const { getTypeTaskList } = typeTaskList;
const { getStatusList } = statusList;
const { getPriorityList } = priorityList;
const StyleSelection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
}));
const categoryTypeTaskMap = {
  1: "bug",
  2: "new task",
};
const categoryStatusMap = {
  1: "BACKLOG",
  2: "SELECTED FOR DEVELOPMENT",
  3: "IN PROGRESS",
  4: "DONE",
};
const categoryPriorityMap = {
  1: "High",
  2: "Medium",
  3: "Low",
  4: "Lowest",
};
const TimeInput = styled(TextField)(({ theme }) => ({
  backgroundColor: colors.blueGrey[50],
  transition: "all ease 0.1s",
  borderRadius: "4px",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "&:hover": {
    backgroundColor: colors.blueGrey[100],
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));
const Group = styled(Box)(
  ({
    theme,
    justify,
    align = "center",
    gap = "0px",
    flexDirection = "column",
  }) => ({
    display: "flex",
    justifyContent: justify,
    alignItems: align,
    gap: gap,
    flexDirection: flexDirection,
  })
);

const Task = () => {
  const { taskId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: auth } = useSelector(authSelector);

  const { taskDetail, comment } = useSelector(projectSelector);

  const {
    handleSubmit,

    formState: {},
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const { data: typeTaskList } = useRequest(getTypeTaskList);
  const { data: statusList } = useRequest(getStatusList);
  const { data: priorityList } = useRequest(getPriorityList);

  const [task, setTask] = useState({
    taskName: "",
    description: "",
    statusId: "",
    typeId: "",
    priorityId: "",
    originalEstimate: "",
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  };
  const sumTimeTracking = task?.timeTrackingSpent + task?.timeTrackingRemaining;

 
  let descriptionEdit = null;
  const handleEditorChange = (content, editor) => {
    descriptionEdit = content;
  };
  const activeTypeTaskStyle = (id, theme) => {
    if (task?.typeId === id) {
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
      };
    }
  };

  const activeStatusStyle = (statusId, theme) => {
    if (task?.statusId === statusId) {
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
      };
    }
  };

  const activePriorityStyle = (priorityId, theme) => {
    if (task?.priorityId === priorityId) {
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
      };
    }
  };

  useEffect(() => {
    dispatch(getSearchTaskThunk(taskId));
    dispatch(getCommentThunk(taskId));
  }, [taskId]);

  useEffect(() => {
    if (taskDetail) {
      setTask(taskDetail);
    }
  }, [taskDetail]);
  useEffect(() => {
    dispatch(getSearchTaskThunk(taskId));
  }, [comment]);

  const onSubmit = async () => {
    try {
      let taskInfo = "";
      if (descriptionEdit !== null) {
        taskInfo = { ...task, description: descriptionEdit };
      } else {
        taskInfo = { ...task };
      }
      const data = await dispatch(updateTaskThunk(taskInfo)).unwrap();

      dispatch(getSearchTaskThunk(taskId));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container  maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={7}>      
            <Grid marginTop={2} container>
              <Grid>
                <Typography
                  sx={{ display: "block", marginBottom: "16px" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  TYPE TASK
                </Typography>
                <Grid>
                  <StyleSelection>
                    {typeTaskList?.map((item) => (
                      <Chip
                        key={item.id}
                        name="typeId"
                        value={item.id}
                        sx={(theme) => ({
                          color:
                            item.taskType === categoryTypeTaskMap["2"]
                              ? colors.green[500]
                              : colors.amber[500],
                          backgroundColor:
                            item.taskType === categoryTypeTaskMap["1"]
                              ? alpha(colors.green[50], 0.2)
                              : colors.amber[50],
                          "&:hover": {
                            backgroundColor:
                              task?.typeId === item.id
                                ? theme.palette.secondary.light
                                : item.taskType === categoryTypeTaskMap["2"]
                                ? alpha(theme.palette.primary.main, 0.2)
                                : item.taskType === categoryTypeTaskMap["1"]
                                ? colors.green[100]
                                : colors.amber[100],
                          },
                          ...activeTypeTaskStyle(item.id, theme),
                        })}
                        onClick={() => {
                          setTask((current) => {
                            return {
                              ...current,
                              typeId: item.id,
                            };
                          });
                        }}
                        label={
                          item.taskType === categoryTypeTaskMap["1"]
                            ? "Bug"
                            : "New task"
                        }
                      />
                    ))}
                  </StyleSelection>
                  <InputLabel></InputLabel>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ textAlign: "left" }} container>
              <Grid marginTop={2} xs={4} item>
                <Typography
                  sx={{ display: "block" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  Task Name
                </Typography>
                <Typography>{task?.taskName}</Typography>
              </Grid>
            </Grid>
            <Grid marginTop={2} container>
              <Grid marginBottom={1}>
                <Typography
                  sx={{ display: "block" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  Write description
                </Typography>
              </Grid>
              <Grid xs={11} item>
                <Editor
                  initialValue={task?.description}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={handleEditorChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} marginTop={2}>
            <Grid marginTop={2} container>
              <Grid item xs={12}>
                <Typography
                  sx={{ display: "block", marginBottom: "16px" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  STATUS
                </Typography>
                <Grid item xs={12}>
                  <StyleSelection>
                    {statusList?.map((item) => (
                      <Chip
                        key={item.statusId}
                        name="statusId"
                        value={item.statusId}
                        sx={(theme) => ({
                          color:
                            item.statusName === categoryStatusMap["1"]
                              ? theme.palette.primary.light
                              : item.statusName === categoryStatusMap["2"]
                              ? colors.green[500]
                              : item.statusName === categoryStatusMap["3"]
                              ? colors.amber[500]
                              : colors.red[500],
                          backgroundColor:
                            item.statusName === categoryStatusMap["1"]
                              ? alpha(theme.palette.primary.light, 0.2)
                              : item.statusName === categoryStatusMap["2"]
                              ? colors.green[50]
                              : item.statusName === categoryStatusMap["3"]
                              ? colors.amber[50]
                              : colors.red[50],
                          "&:hover": {
                            backgroundColor:
                              task?.statusId === item.statusId
                                ? theme.palette.secondary.light
                                : item.statusName === categoryStatusMap["1"]
                                ? alpha(theme.palette.primary.main, 0.2)
                                : item.statusName === categoryStatusMap["3"]
                                ? colors.green[100]
                                : item.statusName === categoryStatusMap["2"]
                                ? colors.amber[100]
                                : colors.red[100],
                          },
                          ...activeStatusStyle(item.statusId, theme),
                        })}
                        onClick={() => {
                          setTask((current) => {
                            return {
                              ...current,
                              statusId: item.statusId,
                            };
                          });
                        }}
                        label={item.statusName}
                      />
                    ))}
                  </StyleSelection>
                </Grid>
              </Grid>
            </Grid>
            <Grid marginTop={2} container>
              <Grid>
                <Typography
                  sx={{ display: "block", marginBottom: "16px" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  PRIORITY
                </Typography>
                <Grid item xs={12}>
                  <StyleSelection>
                    {priorityList?.map((item) => (
                      <Chip
                        key={item.priorityId}
                        name="priorityId"
                        value={item.priorityId}
                        sx={(theme) => ({
                          color:
                            item.priority === categoryPriorityMap["1"]
                              ? theme.palette.primary.light
                              : item.priority === categoryPriorityMap["2"]
                              ? colors.green[500]
                              : item.priority === categoryPriorityMap["3"]
                              ? colors.amber[500]
                              : colors.red[500],
                          backgroundColor:
                            item.priority === categoryPriorityMap["1"]
                              ? alpha(theme.palette.primary.light, 0.2)
                              : item.priority === categoryPriorityMap["2"]
                              ? colors.green[50]
                              : item.priority === categoryPriorityMap["3"]
                              ? colors.amber[50]
                              : colors.red[50],
                          "&:hover": {
                            backgroundColor:
                              task?.priorityId === item.priorityId
                                ? theme.palette.secondary.light
                                : item.priority === categoryPriorityMap["1"]
                                ? alpha(theme.palette.primary.main, 0.2)
                                : item.priority === categoryPriorityMap["2"]
                                ? colors.green[100]
                                : item.priority === categoryPriorityMap["3"]
                                ? colors.amber[100]
                                : colors.red[100],
                          },
                          ...activePriorityStyle(item.priorityId, theme),
                        })}
                        onClick={() => {
                          setTask((current) => {
                            return {
                              ...current,
                              priorityId: item.priorityId,
                            };
                          });
                        }}
                        label={item.priority}
                      />
                    ))}
                  </StyleSelection>
                </Grid>
              </Grid>
            </Grid>
            <Grid marginTop={2} container>
              <Grid>
                <Typography
                  sx={{ display: "block", marginBottom: "16px" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  Assigness
                </Typography>
                <Grid item xs={12}>
                  <MembersTask
                    assigness={taskDetail?.assigness}
                    taskId={taskDetail?.taskId}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid marginTop={2} container>
              <Typography
                sx={{ display: "block", marginBottom: "16px" }}
                align="left"
                variant="subtitle1"
                fontWeight={700}
              >
                Original estimate (HOURS)
              </Typography>
              <Grid item xs={12}>
                <TimeInput
                  type="number"
                  value={task?.originalEstimate}
                  onChange={(e) => {
                    setTask((current) => {
                      return {
                        ...current,
                        originalEstimate: Number(e.target.value),
                      };
                    });
                  }}
                  size="small"
                  fullWidth
                  placeholder="Please enter estimate..."
                />
              </Grid>
            </Grid>

            <Grid marginTop={2} container>
              <Typography
                sx={{ display: "block", marginBottom: "16px" }}
                align="left"
                variant="subtitle1"
                fontWeight={700}
              >
                Time Tracking
              </Typography>
              <Grid item xs={12}>
                <Dialog
                  fullWidth
                  maxWidth="xs"
                  open={isDialogOpen}
                  onClose={toggleDialog}
                >
                  <DialogTitle
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="caption" fontWeight={700}>
                      Time Tracking
                    </Typography>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={toggleDialog}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <Grid spacing={2} container>
                      <Grid item xs={12}>
                        <Group
                          align="flex-start"
                          flexDirection="row"
                          gap="16px"
                        >
                          <FontAwesomeIcon
                            fontSize={24}
                            style={{ color: colors.blueGrey[500] }}
                            icon={faClock}
                          />
                          <Group
                            display="flex"
                            alignItems="center"
                            gap="8px"
                            width="100%"
                          >
                            <Box
                              height={8}
                              sx={{
                                backgroundColor: colors.blueGrey[100],
                                borderRadius: "50px",
                                overflow: "hidden",
                              }}
                              width="100%"
                            >
                              <Box
                                sx={{
                                  backgroundColor: colors.lightBlue[500],
                                  borderRadius: "50px",
                                }}
                                height={"100%"}
                                width={`${
                                  (task?.timeTrackingSpent / sumTimeTracking) *
                                  100
                                }%`}
                              ></Box>
                            </Box>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              width="100%"
                            >
                              <Typography variant="body1" fontWeight={700}>
                                {task.timeTrackingSpent
                                  ? `${task?.timeTrackingSpent}h logged`
                                  : "No time logged"}
                              </Typography>
                              <Typography variant="body1" fontWeight={700}>
                                {task?.timeTrackingRemaining
                                  ? `${task?.timeTrackingRemaining}h remaining`
                                  : "No time remaining"}
                              </Typography>
                            </Box>
                          </Group>
                        </Group>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" fontWeight={700}>
                          Time spent (hours)
                        </Typography>
                        <TimeInput
                          type="number"
                          value={task?.timeTrackingSpent}
                          onChange={(e) => {
                            setTask((current) => {
                              return {
                                ...current,
                                timeTrackingSpent: Number(e.target.value),
                              };
                            });
                          }}
                          placeholder="Number"
                          size="small"
                          InputProps={{
                            inputProps: {
                              max: 100,
                              min: 0,
                            },
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" fontWeight={700}>
                          Time remaining (hours)
                        </Typography>
                        <TimeInput
                          type="number"
                          InputProps={{
                            inputProps: {
                              max: 100,
                              min: 0,
                            },
                          }}
                          value={task?.timeTrackingRemaining}
                          onChange={(e) => {
                            setTask((current) => {
                              return {
                                ...current,
                                timeTrackingRemaining: Number(e.target.value),
                              };
                            });
                          }}
                          placeholder="Number"
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogContent
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button onClick={toggleDialog} variant="contained">
                      Done
                    </Button>
                  </DialogContent>
                </Dialog>
                <Group
                  onClick={toggleDialog}
                  sx={{
                    cursor: "pointer",
                    transition: "all ease 0.2s",
                    padding: "8px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: colors.blueGrey[50],
                    },
                  }}
                  flexDirection="row"
                  gap="16px"
                >
                  <FontAwesomeIcon
                    style={{ color: colors.blueGrey[500] }}
                    icon={faClock}
                  />
                  <Group
                    display="flex"
                    alignItems="center"
                    gap="8px"
                    width="100%"
                  >
                    <Box
                      height={6}
                      sx={{
                        backgroundColor: colors.blueGrey[100],
                        borderRadius: "50px",
                        overflow: "hidden",
                      }}
                      width="100%"
                    >
                      <Box
                        sx={{
                          backgroundColor: colors.lightBlue[500],
                          borderRadius: "50px",
                        }}
                        height={"100%"}
                        width={`${
                          (task?.timeTrackingSpent / sumTimeTracking) * 100
                        }%`}
                      ></Box>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography variant="caption" lineHeight="12px">
                        {task?.timeTrackingSpent
                          ? `${task?.timeTrackingSpent}h logged`
                          : "No time logged"}
                      </Typography>
                      <Typography variant="caption" lineHeight="12px">
                        {task?.timeTrackingRemaining
                          ? `${task?.timeTrackingRemaining}h remaining`
                          : "No time remaining"}
                      </Typography>
                    </Box>
                  </Group>
                </Group>
              </Grid>
            </Grid>
            <Grid marginTop={2} container sx={{ gap: "10px" }}>
              <Grid>
                <Button
                  type="submit"
                  sx={{ borderRadius: "8px" }}
                  variant="contained"
                  color="primary"
                >
                  Update Task
                </Button>
              </Grid>
              <Grid>
                <Button
                  sx={{ borderRadius: "8px" }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    try {
                      dispatch(removeTaskThunk(taskDetail?.taskId));
                      navigate(`/project/${taskDetail?.projectId}`);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Delete Task
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={() => {
                    navigate(`/project/${taskDetail?.projectId}`);
                  }}
                  sx={{ borderRadius: "8px" }}
                  variant="outlined"
                  color="secondary"
                >
                  Cancle Task
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </form>

      <Box marginTop={1} width="50%">
        <Grid container >
          <Typography
            sx={{ display: "block", marginBottom: "16px" }}
            align="left"
            variant="subtitle1"
            fontWeight={700}
          >
            Comment
          </Typography>
          <Grid
            container
            marginTop={2}
            marginBottom={2}
            sx={{ textAlign: "left", alignItems: "center" }}
          >
            <Grid item xs={2}>
              <Avatar src={auth?.avatar}></Avatar>
            </Grid>
            <Grid item xs={6}>
              <Typography> {auth?.name}</Typography>
            </Grid>
            <Grid container xs={12} item>
              <Grid item xs={9.5}>
                <TextField
                  sx={{ margin: "5px 0 0 56px" }}
                  hiddenLabel
                  fullWidth
                  placeholder="Please enter comment"
                  size="small"
                  name="comment"
                  onKeyDown={(e) => {
                    e.stopPropagation();

                    if (e.key !== "Enter") {
                      return;
                    }
                    const numberTaskId = Number(taskId);

                    const commentInfo = {
                      taskId: numberTaskId,
                      contentComment: e.target.value,
                    };

                    dispatch(insertCommentThunk(commentInfo));
                    dispatch(getCommentThunk(taskId));
                    e.target.value = "";
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {taskDetail?.lstComment?.map((item, index) => {
              return (
                <Comment
                  key={item?.id}
                  comment={taskDetail?.lstComment}
                  index={index}
                  taskId={taskId}
                ></Comment>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Task;
