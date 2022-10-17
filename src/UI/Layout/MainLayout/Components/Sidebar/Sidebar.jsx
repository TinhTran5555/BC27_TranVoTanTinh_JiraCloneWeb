import React, { useState } from 'react';
import {alpha, styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  colors,
  Typography,
  Divider,
  Collapse,
  Fade
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsProgress,
  faBorderNone,
  faBug,
  faChartSimple,
  faFilter,
  faGear,
  faPager,
  faSection,
  faShip,
  faCompress,
  faExpand
} from '@fortawesome/free-solid-svg-icons';


import { NavLink, useLocation, useParams } from 'react-router-dom';



const SidebarWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 72,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  height: '100vh',
  width: '240px',
  overflowX: 'hidden',
  backgroundColor: colors.grey[100],
}));

const ProjectOverview = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  marginLeft: '8px',
  marginRight: '8px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
}));

const mainMenuData = [
  {
    label: 'Create Task',
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    link: 'project/board',
  },
 
];



const Sidebar = () => {
  const [isProjectManager, setIsProjectManager] = useState(false);
  const NavItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const navItemStyle = () => {
  return {
    display: 'flex',
    width: '100%',
    justifyContent: isProjectManager && 'flex-start',
    cursor: 'pointer',
    transition: 'all ease 0.2s',
    color: colors.grey[50],
    '&: hover': {
      backgroundColor: isProjectManager
        ? alpha(colors.grey[50], 0.2)
        : undefined,
    },
  };
};
const navbarStyle = () => {
  return {
    width: isProjectManager ? '312px' : '72px',
    zIndex: 100,
    transition: 'all ease-in-out 0.2s',
  };
};
const IconButton = styled(Box)(({ theme }) => ({
  height: '56px',
  width: '56px',
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
}));
const iconButtonStyle = () => {
  return {
    marginLeft: isProjectManager ? '32px' : '',
    color: colors.grey[50],
    cursor: 'pointer',
    '&: hover': {
      backgroundColor: !isProjectManager
        ? alpha(colors.grey[50], 0.2)
        : undefined,
    },
  };
};

  return (
    <SidebarWrapper>
      <ProjectOverview>
        <img height='48px' src='/project.png' alt='project.png' />
        <Box sx={{ width: '100%' }}>
          
          <Typography
            variant='body1'
            fontWeight={700}
            sx={(theme) => ({
              color: theme.palette.primary.main,
            })}
          >
             Jira Cloner
          </Typography>
        </Box>
      </ProjectOverview>
      <Paper
        sx={(theme) => ({
          width: 320,
          maxWidth: '100%',
          backgroundColor: 'transparent',
          boxShadow: 'unset',
          color: colors.grey[900],
        })}
      >
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
          <Collapse orientation='horizontal' in={isProjectManager}>
            <Fade in={isProjectManager}>
              <Typography
                sx={{ whiteSpace: 'nowrap' }}
                variant='subtitle1'
                fontWeight={700}
              >
                Close
              </Typography>
            </Fade>
          </Collapse>
        </NavItem>
        <Divider />
        
      </Paper>
    </SidebarWrapper>
  );
};

export default Sidebar;
