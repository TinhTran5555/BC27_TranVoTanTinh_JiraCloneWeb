import { Container } from "@mui/system";
import {
  Typography,
  Box,
  styled,
  Grid,
  AvatarGroup,
  Avatar,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector } from "../../../../app/store";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectDetailThunk } from "../../slice/projectSlice";
import List from "./List";

const Heading = styled(Box)(({ theme }) => ({
  textAlign: "left",
  display: "flex",

  alignItems: "center",
}));

const StyleContainer = styled(Container)(({ theme }) => ({}));

const ProjectDeatail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectDetail } = useSelector(projectSelector);

  useEffect(() => {
    dispatch(getProjectDetailThunk(projectId));
  }, [projectId]);
  return (
    <StyleContainer maxWidth="xl">
      <Grid marginTop={2}>
        <Grid>
          <Heading>
            <Typography
              marginRight={2}
              fontWeight={700}
              variant="h5"
              component="h2"
            >
              {projectDetail.projectName}
            </Typography>

            <AvatarGroup max={5}>
              {projectDetail?.members?.map((member) => (
                <Avatar
                  style={{ marginLeft: "0px" }}
                  key={member.userId}
                  alt={member.name}
                  src={member.avatar}
                ></Avatar>
              ))}
            </AvatarGroup>
            <Button sx={{marginLeft:"20px"}} variant="contained"
                 color="success"
              onClick={() => {
                navigate(`/project/${projectId}/create-task`);
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Create Task
            </Button>
          </Heading>
        </Grid>
      </Grid>
      <Grid container marginTop={2}>
        <List listTask={projectDetail.lstTask} />
      </Grid>
    </StyleContainer>
  );
};

export default ProjectDeatail;
