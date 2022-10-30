import React, { useReducer, useState, useEffect } from "react";
import "draft-js/dist/Draft.css";
import {
  Chip,
  InputLabel,
  Box,
  TextField,
  Typography,
  colors,
  alpha,
  styled,
  Alert,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/system";
import { useRequest } from "../../../../app/hooks/request/useRequest";
import typeTaskList from "../../../../app/apis/typeTaskList/typeTaskList";
import statusList from "../../../../app/apis/statusList/statusList";
import { projectSelector } from "../../../../app/store";
import priorityList from "../../../../app/apis/priorityList/priorityList";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByProjectIdThunk,
  createTaskThunk,
} from "../../slice/projectSlice";

const { getTypeTaskList } = typeTaskList;
const { getStatusList } = statusList;
const { getPriorityList } = priorityList;
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
const StyleSelection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const alertCase = {
  loading: "ALERT_LOADING",
  error: "ALERT_ERROR",
  success: "ALERT_SUCCESS",
};

const initialAlertState = {
  isLoading: false,
  errorMessage: "",
  successMessage: "",
};

const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case alertCase.loading:
      return {
        ...state,
        isLoading: true,
      };
    case alertCase.error:
      return {
        ...state,
        isLoading: false,
        successMessage: "",
        errorMessage: payload,
      };
    case alertCase.success:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        successMessage: "Create Project Successfully",
      };
    default:
      return state;
  }
};

const CreateTask = () => {
  const { projectId } = useParams();
  const { userProject } = useSelector(projectSelector);

  const { data: typeTaskList } = useRequest(getTypeTaskList);
  const { data: statusList } = useRequest(getStatusList);
  const { data: priorityList } = useRequest(getPriorityList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listUser, setListUser] = React.useState([]);
  const [task, setTask] = useState({
    projectId: projectId,

    description: "null",
    statusId: null,
    typeId: null,
    priorityId: null,
    taskName: "",
  });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setListUser(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
  const [alertState, dispatchAlert] = useReducer(
    alertReducer,
    initialAlertState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const onSubmit = async () => {
    try {
      dispatchAlert({ type: alertCase.loading });
      if (!task.typeId) {
        dispatchAlert({
          type: alertCase.error,
          payload: "You haven't selected type ",
        });
        return;
      }
      if (!task.statusId) {
        dispatchAlert({
          type: alertCase.error,
          payload: "You haven't selected status",
        });
        return;
      }
      if (!task.priorityId) {
        dispatchAlert({
          type: alertCase.error,
          payload: "You haven't selected priority",
        });
        return;
      }
      let taskInfo = {
        projectId: projectId,
        listUserAsign: listUser,
        description: task.description,
        statusId: task.statusId,
        typeId: task.typeId,
        priorityId: task.priorityId,
        taskName: task.taskName,
      };
      console.log(taskInfo);

      const data = await dispatch(createTaskThunk(taskInfo)).unwrap();
      dispatchAlert({
        type: alertCase.success,
      });

      return data;
    } catch (error) {
      console.log(error);
      dispatchAlert({
        type: alertCase.error,
        payload: error,
      });
    }
  };

  const handleEditorChange = (content, editor) => {
    setTask((current) => {
      return {
        ...current,
        description: content,
      };
    });
  };
  useEffect(() => {
    dispatch(getUserByProjectIdThunk(projectId));
  }, [projectId]);

  return (
    <Container sx={{ marginTop: "32px" }} maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h5" fontWeight={700}>
              Create New Task
            </Typography>
            <Grid sx={{ textAlign: "left" }} container>
              <Grid item marginTop={2} xs={5}>
                <InputLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: colors.grey[900],
                  }}
                >
                  Task Name
                </InputLabel>
                <TextField
                  size="small"
                  placeholder="Input your task's name"
                  {...register("taskName", {
                    required: {
                      value: true,
                      message: "This is required",
                    },
                    pattern: {
                      value: /^[^'"!@#$%^&*()?,:;~`+=-]*$/,
                      message: "Not contain special character",
                    },
                  })}
                  fullWidth
                  color={errors.taskName ? "error" : ""}
                  error={!!errors.taskName}
                  helperText={errors.taskName?.message}
                  onChange={(e) => {
                    setTask((current) => {
                      return {
                        ...current,
                        taskName: e.target.value,
                      };
                    });
                  }}
                />
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
            <Grid2 marginTop={2} container>
              <Grid2 marginBottom={1} xs={12}>
                <Typography
                  sx={{ display: "block" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  Write description
                </Typography>
              </Grid2>
              <Grid2 xs={8}>
                <Editor
                  placeholder="Write your task's description... "
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
              </Grid2>
            </Grid2>
          </Grid>
          <Grid item xs={5} marginTop={5}>
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
                  <Select
                    sx={{ width: "300px" }}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={listUser}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>Placeholder</em>
                    </MenuItem>
                    {userProject?.map((user) => (
                      <MenuItem key={user.userId} value={user.userId}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid marginTop={4} container>
            <Box>
              <Button
                type="submit"
                sx={{ borderRadius: "8px" }}
                variant="contained"
                color="primary"
                disabled={alertState.isLoading}
              >
                Add Task
              </Button>
            </Box>
            <Box sx={{ marginLeft: "20px" }}>
              <Button
                onClick={() => {
                  navigate(`/project/${projectId}`);
                }}
                sx={{ borderRadius: "8px" }}
                variant="outlined"
                color="secondary"
              >
                Cancle
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Grid container>
        <Grid>
          <Box marginTop={4}>
            {alertState.errorMessage ? (
              <Alert severity="error">{alertState.errorMessage}</Alert>
            ) : alertState.successMessage ? (
              <Alert severity="success">{alertState.successMessage}</Alert>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateTask;
