import { alpha, Container } from "@mui/system";
import {
  Typography,
  Box,
  styled,
  Chip,
  colors,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  TextField,
  InputBase,
  Grid,
  Avatar,
  AvatarGroup,
  
  ListItem,
  Divider ,
  ListItemText ,
  ListItemAvatar
} from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector } from "../../../../app/store";
import { useParams } from "react-router-dom";
import { getProjectDetailThunk } from "../../slice/projectSlice";
import List from "./List";

const Heading = styled(Box)(({ theme }) => ({
  textAlign: "left",
}));


const BoxList = styled(Box)(({ theme }) => ({
  width: "95%"

}));
const ItemTaskDetail = styled(Box)(({ theme }) => ({
  marginBottom: "5px",
  flexGrow: "1",
    padding: "10px",
    boxShadow: " #091e4240 0 1px 2px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    alignItems: "flex-start",
}));
const TextTaskDetail = styled(Typography)(({ theme }) => ({
  fontSize: '13px',

}));
const MemberAvatar = styled(Avatar)(({ theme }) => ({
  width: "25px",
  height: "25px",
  marginLeft: "-8px"
}));

const ProjectDeatail = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();


  const { projectDetail } = useSelector(projectSelector);

  useEffect(() => {
    dispatch(getProjectDetailThunk(projectId));
  }, [projectId]);
  return (
    <Container maxWidth="xl">
      <Grid marginTop={2}>
        <Grid >
          <Heading>
            <Typography fontWeight={700} variant="h5" component="h1">
              {projectDetail.projectName}
            </Typography>
          </Heading>
        </Grid>
      </Grid>
      <Grid container marginTop={2} >
        <List listTask={projectDetail.lstTask}/>
        {/* {projectDetail?.lstTask?.map((task) => (
          <Collum  key={task.statusId}>
            <TextTitle>{task.statusName}<span style={{marginLeft: "5px"}}>({task.lstTaskDeTail.length})</span></TextTitle>
            
          </Collum>
        ))} */}
      </Grid>
      {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List> */}
      {/* <List variant="outlined"
              sx={{
                minWidth: 240,
                borderRadius: 'sm',
                '--List-decorator-size': '48px',
                '--List-item-paddingLeft': '1.5rem',
                '--List-item-paddingRight': '1rem',
              }}
>  <ListItem>
              <ListItemText  orator sx={{ alignSelf: 'flex-start' }}>
                <Avatar size="sm" src="/static/images/avatar/1.jpg" />
              </ListItemText>
              Mabel Boyle
            </ListItem>
            <Divider   />
            <ListItem>
              <ListItemText  sx={{ alignSelf: 'flex-start' }}>
                <Avatar size="sm" src="/static/images/avatar/2.jpg" />
              </ListItemText>
              Boyd Burt
            </ListItem>
        
      </List> */}
      {/* <Grid xs={12} container marginTop={2}>
        {projectDetail?.lstTask?.map((task) => (
          <Collum key={task.statusId}>
            <TextTitle>{task.statusName}<span style={{marginLeft: "5px"}}>({task.lstTaskDeTail.length})</span></TextTitle>
            <BoxList> 
              {task?.lstTaskDeTail.map((taskDetail)=> (
                <ItemTaskDetail key={taskDetail.taskId}>
                  <TextTaskDetail>Project Name: {taskDetail?.taskName}</TextTaskDetail>
                  <TextTaskDetail>Priority: {taskDetail?.priorityTask.priority}</TextTaskDetail>
                  <TextTaskDetail>Type: {taskDetail.taskTypeDetail.taskType}</TextTaskDetail>
                  <div style={{display: "flex"}}> Member:     
                    <AvatarGroup max={2} sx={{ml:0.5}}>  
                  {taskDetail?.assigness.map((member)=> (
                   <MemberAvatar key={member.id} alt={member.name} src={member.avatar} ></MemberAvatar>  
                  ))}                   
                  </AvatarGroup>
                  </div>
                  
                </ItemTaskDetail>
              ))}
            </BoxList>
          </Collum>
        ))}
      </Grid> */}
    </Container>
  );
};

export default ProjectDeatail;
