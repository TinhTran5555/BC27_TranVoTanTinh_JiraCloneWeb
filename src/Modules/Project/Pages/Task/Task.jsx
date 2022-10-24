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
  Chip
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
const { getTypeTaskList } = typeTaskList;

const Task = () => {
  const BoxStyle = styled(Box)(({ theme }) => ({
    marginTop: "90px",
  }));
  const TitleStyle = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    fontWeight: 600,
    color: colors.teal[500],
  }));
  const TagNameStyle = styled(Grid)(({ theme }) => ({
    fontWeight: 400,
    backgroundColor: colors.teal[100],
    color: "#000",
    paddingTop: "5px",
    paddingBottom: "5px",
  }));
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { taskDetail } = useSelector(projectSelector);
  const {taskTypeDetail} = taskDetail
  console.log(taskDetail);
  const listTypeTask = {
    bug: "Bug",
    new: "New task",
    
  };
  const [typeTask, setTypeTask] = useState(null);

  console.log("typeTask", typeTask);
  const [task, setTask] = useState({
   
    taskName:"",
    description: "",
    statusId: "",
    typeId: "",
    priorityId:"",
    listUserAsign: [null]
  }); 
  console.log(task);
  const handleClick = (event) => {
    console.log(event);
    setTypeTask(event.currentTarget); 
    console.log(typeTask);
  };

  const handleClose = () => {
    setTypeTask(null);
  };
  const handleSelected = () => {
    setTypeTask("efgh");
  };

  const openTypeTask = Boolean(typeTask);
  const idTypeTask = openTypeTask ? "simple-popover" : undefined;
  // const open = Boolean(typeTask);
  // const id = open ? "simple-popover" : undefined;
  // const open = Boolean(typeTask);
  // const id = open ? "simple-popover" : undefined;
  // const open = Boolean(typeTask);
  // const id = open ? "simple-popover" : undefined;

  const handleEditorChange = (content, editor) => {
    console.log(content);
  };
  useEffect(() => {
   
    dispatch(getSearchTaskThunk(taskId));
  }, [taskId]);
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ textAlign: "left" }}>
            <Box>
              <Button
                sx={{ color: "#000" }}
                aria-describedby={idTypeTask}
                variant="outlined"
                onClick={handleClick}
              >
                {typeTask? "abc" : taskDetail?.taskTypeDetail?.taskType}
              </Button>
              
              <Popover
                id={idTypeTask}
                open={openTypeTask}
                anchorEl={typeTask}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              > 
               <MenuItem
                  name="typeId"
                  value="bug"
                   sx={{width: "151px"}} 
                   onClick={handleSelected}>
Bug
                 
                  
                </MenuItem>
                <MenuItem
                  name="typeId"
                  value="new task"
                   sx={{width: "151px"}} 
                   onClick={handleSelected}>
New Task
                 
                  
                </MenuItem>

              
               
              </Popover>
            </Box>
            <Typography
              fontWeight={700}
              variant="h4"
              component="h4"
              marginBottom={2}
            >
              Task Details
            </Typography>
            <TitleStyle>Description</TitleStyle>
            <Box marginBottom={2}>
              <Editor
                initialValue="{project?.description}"
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
            </Box>
            <TitleStyle>Comments</TitleStyle>

            <Grid
              marginTop={1}
              marginLeft={2}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Avatar src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"></Avatar>
              <Typography variant="h6" component="h6" marginLeft={2}>
                NAME
              </Typography>
            </Grid>
            <TextField
              sx={{ marginLeft: "20px", marginTop: "5px", width: "95%" }}
            ></TextField>
            <Box marginTop={2}>
              <Button variant="contained" color="success">
                Update
              </Button>
              <Button
                sx={{ marginLeft: "5px" }}
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ textAlign: "right" }}>
            <Button onClick={() => {}} color="primary">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            {/* <Box>
              <TitleStyle>STATUS</TitleStyle>
              <Button
                sx={{
                  fontWeight: 400,
                  backgroundColor: colors.teal[100],
                  color: "#000",
                }}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                Name Type Text
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={typeTask}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem sx={{ width: 160 }} onClick={handleSelected}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSelected}>My account</MenuItem>
                <MenuItem onClick={handleSelected}>Logout</MenuItem>
              </Popover>
            </Box>
            <Box sx={{ marginTop: "90px" }}>
              <TitleStyle>REPORTER</TitleStyle>
              <Button
                sx={{
                  fontWeight: 400,
                  backgroundColor: colors.teal[100],
                  color: "#000",
                }}
                aria-describedby={id}
                variant="text"
                onClick={handleClick}
              >
                Name Type Text
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={typeTask}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem sx={{ width: 151 }} onClick={handleSelected}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSelected}>My account</MenuItem>
                <MenuItem onClick={handleSelected}>Logout</MenuItem>
              </Popover>
            </Box> */}
            <BoxStyle>
              <TitleStyle>ASSIGNEES</TitleStyle>
              <Grid container rowSpacing={1}>
                <Grid container item xs={5} >
                  {" "}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: colors.teal[100],
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"
                    ></Avatar>
                    <Typography sx={{ fontSize: "16px" }} marginLeft={1}>
                      NAME
                    </Typography>
                    <button
                      style={{
                        width: "20px",
                        border: "none",
                        backgroundColor: colors.teal[100],
                        cursor:"pointer"
                      }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </Box>
                </Grid>
                <Grid container item xs={4}>
                  {" "}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: colors.teal[100],
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"
                    ></Avatar>
                    <Typography sx={{ fontSize: "16px" }} marginLeft={1}>
                      NAME
                    </Typography>
                    <button
                      style={{
                        width: "20px",
                        border: "none",
                        backgroundColor: colors.teal[100],
                        cursor:"pointer"
                      }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </Box>
                </Grid>
                <Grid container item xs={4}>
                  {" "}
                  <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: colors.teal[100],
                      color: "#000",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      src="https://res.cloudinary.com/dvujyxh7e/image/upload/c_scale,w_48/v1593253478/trung-vo_bioxmc.png"
                    ></Avatar>
                    <Typography sx={{ fontSize: "16px" }} marginLeft={1}>
                      NAME
                    </Typography>
                    <button
                   
                      style={{
                        width: "20px",
                        border: "none",
                        backgroundColor: colors.teal[100],
                         cursor:"pointer"
                      }}
                      onClick={() => {}}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </Box>
                </Grid>
              </Grid>
            </BoxStyle>
            {/* <Box sx={{ marginTop: "90px" }}>
              <TitleStyle>REPORTER</TitleStyle>
              <Button
                sx={{
                  fontWeight: 400,
                  backgroundColor: colors.teal[100],
                  color: "#000",
                }}
                aria-describedby={id}
                variant="text"
                onClick={handleClick}
              >
                Name Type Text
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={typeTask}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem sx={{ width: 151 }} onClick={handleSelected}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSelected}>My account</MenuItem>
                <MenuItem onClick={handleSelected}>Logout</MenuItem>
              </Popover>
            </Box> */}
            <BoxStyle>
            <Typography>abcsacs</Typography>
            <Typography>abcsacs</Typography>
</BoxStyle>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Task;
