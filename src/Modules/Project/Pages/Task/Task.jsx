import {
  Grid,
  Paper,
  styled,
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
  Popover,
  Avatar,
  TextField,
  colors,
  Chip,
  FormControl,
  Select,
  InputLabel,
  alpha,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { projectSelector } from "../../../../app/store";
import { Editor } from "@tinymce/tinymce-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getSearchTaskThunk } from "../../slice/projectSlice";
import { useRequest } from "../../../../app/hooks/request/useRequest";
import typeTaskList from "../../../../app/apis/typeTaskList/typeTaskList";
import statusList from "../../../../app/apis/statusList/statusList";
import priorityList from "../../../../app/apis/priorityList/priorityList";
import Members from "../../Components/Members/Members";

import MembersTaskAction from "../../Components/MembersTaskAction/MembersTaskAction";
import { useForm } from "react-hook-form";

const { getTypeTaskList } = typeTaskList;
const { getStatusList } = statusList;
const { getPriorityList } = priorityList;


const StyleSelection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap"
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

const Task = () => {
  const { taskId } = useParams();
  
  const dispatch = useDispatch();
  const { taskDetail } = useSelector(projectSelector);
  
  const {
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });
  const { data: typeTaskList } = useRequest(getTypeTaskList);
  const { data: statusList } = useRequest(getStatusList);
  const { data: priorityList } = useRequest(getPriorityList);


  
  // const [selectedTypeTask, setSelectedTypeTask] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState(null);
  // const [selectedPriority, setSelectedPriority] = useState(null);

  const [task, setTask] = useState({
    taskName: "",
    description: "",
    statusId: "",
    typeId: "",
    priorityId: "",
    listUserAsign: [null],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    setTask((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };
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
    if (task?.statusId=== statusId) {
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
   console.log(taskDetail);
  }, [taskId]);
  useEffect(() => {
    if (taskDetail) { 
    setTask(taskDetail);
  }
}, [taskDetail]);


  const onSubmit = async () => {};
  return (
    <Container sx={{ marginTop: "32px" }} maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container >
          <Grid item xs={7}>
            
            <Typography variant="h5" fontWeight={700}>
              Task details
            </Typography>
            <Grid marginTop={2} container>
              <Grid >
                <Typography
                  sx={{ display: "block", marginBottom: "16px" }}
                  align="left"
                  variant="subtitle1"
                  fontWeight={700}
                >
                  TYPE TASK
                </Typography>
                <Grid >
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
                          console.log("item", item.id);
                          console.log(categoryTypeTaskMap["1"]);
                          
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
                  value={task?.taskName}
                  name="taskName"
                  onChange={handleChange}
                  placeholder="Input your task's name"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid marginTop={2} container>
              <Grid marginBottom={1} >
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
                  PRIORITY
                </Typography>
                <Grid item xs={12}>
                <Members members={taskDetail?.assigness} projectId={taskDetail?.taskId} />
                
                  
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
                >
                  Update Project
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Task;
