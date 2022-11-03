import React, { useState } from "react";
import {
  Box,
  Collapse,
  colors,
  Fade,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import {
  faBarsProgress,
  faCompress,
  faExpand,
  faPlus,
  faSearch,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSearchProjectsThunk,
  getAllProjectsThunk,
} from "../../../../../Modules/Project/slice/projectSlice";
import { logout } from "../../../../../Modules/Auth/slice/authSlice";
import { clearDataProject } from "../../../../../Modules/Project/slice/projectSlice";
const Navbar = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  height: "100vh",
  width: "72px",
  backgroundColor: theme.palette.primary.main,
}));

const NavbarStart = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  color: colors.grey[50],
  rowGap: 8,
}));

const Image = styled(Box)(({ theme }) => ({
  height: "56px",
  width: "56px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
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

const NavItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Navigation = () => {
  const goToLogout= () => {
    dispatch(logout())
    dispatch(clearDataProject())
    navigate("/");
  };
  const [isProjectManager, setIsProjectManager] = useState(false);

  const navigate = useNavigate();

  const navbarStyle = () => {
    return {
      width: isProjectManager ? "312px" : "72px",
      zIndex: 100,
      transition: "all ease-in-out 0.2s",
    };
  };

  const navItemStyle = () => {
    return {
      display: "flex",
      width: "100%",
      justifyContent: isProjectManager && "flex-start",
      cursor: "pointer",
      transition: "all ease 0.2s",
      color: colors.grey[50],
      "&: hover": {
        backgroundColor: isProjectManager
          ? alpha(colors.grey[50], 0.2)
          : undefined,
      },
    };
  };

  const iconButtonStyle = () => {
    return {
      marginLeft: isProjectManager ? "32px" : "",
      color: colors.grey[50],
      cursor: "pointer",
      "&: hover": {
        backgroundColor: !isProjectManager
          ? alpha(colors.grey[50], 0.2)
          : undefined,
      },
    };
  };
  const dispatch = useDispatch();

  const onSearch = (event) => {
    if (event.key !== "Enter") return;

    const { value } = event.target;
    console.log(value);
    if (!value) {
      dispatch(getAllProjectsThunk());
    } else {
      dispatch(getSearchProjectsThunk(value));
    }
  };
  return (
    <Navbar sx={{ ...navbarStyle() }}>
      <NavbarStart>
        <Image>
          <img
            width={"100%"}
            src="/logo-removebg-preview.png"
            alt="/logo-removebg-preview.png"
          />
        </Image>
        <NavItem
          onClick={() => {
            navigate("/project");
          }}
          sx={{ ...navItemStyle() }}
        >
          <IconButton sx={{ ...iconButtonStyle() }}>
            <FontAwesomeIcon icon={faBarsProgress} />
          </IconButton>
          <Collapse orientation="horizontal" in={isProjectManager}>
            <Fade in={isProjectManager}>
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant="subtitle1"
                fontWeight={700}
              >
                Project Management
              </Typography>
            </Fade>
          </Collapse>
        </NavItem>
        <NavItem
          sx={{ ...navItemStyle() }}
          onClick={() => {
            setIsProjectManager(true);
            navigate("/project");
          }}
        >
          <InputLabel htmlFor="searchProject">
            <IconButton sx={{ ...iconButtonStyle() }}>
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>
          </InputLabel>
          <Collapse orientation="horizontal" in={isProjectManager}>
            <Fade in={isProjectManager}>
              <TextField
                placeholder="Search Project"
                id="searchProject"
                variant="standard"
                color="primary"
                sx={{
                  input: { color: colors.grey[50], width: "100%" },
                  "div.MuiInputBase-root": {
                    "&::before": {
                      borderBottom: "none",
                    },
                  },
                }}
                onKeyDown={onSearch}
                fullWidth
              />
            </Fade>
          </Collapse>
        </NavItem>
        <NavItem
          sx={{ ...navItemStyle() }}
          onClick={() => navigate("/project/create-project")}
        >
          <IconButton sx={{ ...iconButtonStyle() }}>
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
          <Collapse orientation="horizontal" in={isProjectManager}>
            <Fade in={isProjectManager}>
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant="subtitle1"
                fontWeight={700}
              >
                Add Project
              </Typography>
            </Fade>
          </Collapse>
        </NavItem>
        <NavItem
          sx={{ ...navItemStyle() }}
          onClick={()=> goToLogout()} 
        >
          <IconButton sx={{ ...iconButtonStyle() }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </IconButton>
          <Collapse orientation="horizontal" in={isProjectManager}>
            <Fade in={isProjectManager}>
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant="subtitle1"
                fontWeight={700}
              >
                Log out
              </Typography>
            </Fade>
          </Collapse>
        </NavItem>
        <NavItem
          sx={{ ...navItemStyle() }}
          onClick={() => setIsProjectManager((prev) => !prev)}
        >
          <IconButton sx={{ ...iconButtonStyle() }}>
            {isProjectManager ? (
              <FontAwesomeIcon icon={faCompress} />
            ) : (
              <FontAwesomeIcon icon={faExpand} />
            )}
          </IconButton>
          <Collapse orientation="horizontal" in={isProjectManager}>
            <Fade in={isProjectManager}>
              <Typography
                sx={{ whiteSpace: "nowrap" }}
                variant="subtitle1"
                fontWeight={700}
              >
                Close
              </Typography>
            </Fade>
          </Collapse>
        </NavItem>
      </NavbarStart>
    </Navbar>
  );
};

export default Navigation;
