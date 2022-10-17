import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumbs, colors, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';

const ContentWrapper = styled(Box)(({ theme }) => ({

  position: 'relative',
  marginLeft: '50px',
  padding: '24px 16px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  height: '100vh',
}));

const Content = () => {
  const { pathname } = useLocation();
  const breadcrumbsData = pathname.slice(1).split('/');

  return (
    <ContentWrapper>
      <div id='draggable'></div>
      <Container maxWidth='xl'>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Breadcrumbs aria-label='breadcrumb'>
              {breadcrumbsData.map((item) => (
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '14px',
                    color: colors.grey[600],
                    fontWeight: 700,
                  }}
                  key={item}
                  color='text.primary'
                >
                  {item}
                </Typography>
              ))}
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Container>
      <Outlet />
    </ContentWrapper>
  );
};

export default Content;
