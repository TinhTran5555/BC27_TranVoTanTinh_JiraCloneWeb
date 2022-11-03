import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumbs, colors, Typography, Avatar, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Container, Box } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../../app/store.js";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {clearDataProject} from "../../../../../Modules/Project/slice/projectSlice.js"
import {logout} from "../../../../../Modules/Auth/slice/authSlice.js"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  marginLeft: "50px",
  padding: "24px 16px",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  height: "100vh",
}));
const IconButton = styled(Box)(({ theme }) => ({
  height: "56px",
  width: "56px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
}));
const iconButtonStyle = () => {
  return {
    
    color: colors.grey[900],
    cursor: "pointer",
    "&: hover": {
      backgroundColor: 
       alpha(colors.grey[700], 0.2)
        
    },
  };
};
const Content = () => {
  const { data: userData } = useSelector(authSelector);
  const { pathname } = useLocation();
  const breadcrumbsData = pathname.slice(1).split("/");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToLogout= () => {
    dispatch(logout())
    dispatch(clearDataProject())
    navigate("/");
  };
  return (
    <ContentWrapper>
      <div id="draggable"></div>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbsData.map((item) => (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "14px",
                    color: colors.grey[600],
                    fontWeight: 700,
                  }}
                  key={item}
                  color="text.primary"
                >
                  {item}
                </Typography>
              ))}
            </Breadcrumbs>
          </Grid>  
          <Grid item xs={4} container>
            <Grid
              item
              xs={6}
              container
              sx={{ alignItems: "center", justifyContent: "space-around" }}
            >
              <Avatar src={userData.avatar}></Avatar>
              <Typography>{userData.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <IconButton sx={{ ...iconButtonStyle() }}  onClick={()=> goToLogout()} >
                <FontAwesomeIcon icon={faRightFromBracket} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Outlet />
    </ContentWrapper>
  );
};

export default Content;
