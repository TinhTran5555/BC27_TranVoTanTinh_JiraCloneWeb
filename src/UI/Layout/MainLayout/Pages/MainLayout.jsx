import { Container } from '@mui/material';
import React from 'react';
import Content from '../Components/Content';
import Navigation from '../Components/Navigation';
import Sidebar from '../Components/Sidebar/Sidebar';

const MainLayout = () => {

  return (
    <>
      <Navigation />
      {/* <Sidebar /> */}
      <Content />
    </>
  );
};

export default MainLayout;
