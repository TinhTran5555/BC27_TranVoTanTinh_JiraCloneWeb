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
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector } from "../../../../app/store";
import { useParams } from "react-router-dom";
import { getProjectDetailThunk } from "../../slice/projectSlice";
const Heading = styled(Box)(({ theme }) => ({
  textAlign: "left",
}));
const Collum = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "calc(25% - 16px)",
  backgroundColor: "#f4f5f7",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginRight: "8px",
  minHeight: "400px",
  paddingBottom: "20px",
  paddingLeft: "8px",
  
}));
const TextTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  color: "#5e6c84",
  fontSize: "0.8125rem",
  overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%"
  //  textAlign: "left",
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

  console.log(projectId);
  const { projectDetail } = useSelector(projectSelector);
  console.log("projectDetail", projectDetail);
  useEffect(() => {
    dispatch(getProjectDetailThunk(projectId));
  }, [projectId]);
  return (
    <Container maxWidth="xl">
      <Grid marginTop={2}>
        <Grid xs={6}>
          <Heading>
            <Typography fontWeight={700} variant="h5" component="h1">
              {projectDetail.projectName}
            </Typography>
          </Heading>
        </Grid>
      </Grid>
      <Grid xs={12} container marginTop={2}>
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
      </Grid>
    </Container>
  );
};

export default ProjectDeatail;
