import React from 'react';
import Content from '../Components/Content';
import Navigation from '../Components/Navigation';
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";


const MainLayout = () => {
  const { data } = useSelector((state) => state.auth );
if (!data) {
  return <Navigate to="/login" />;
}
  return (
    <>
      <Navigation />
      <Content />
    </>
  );
};

export default MainLayout;
