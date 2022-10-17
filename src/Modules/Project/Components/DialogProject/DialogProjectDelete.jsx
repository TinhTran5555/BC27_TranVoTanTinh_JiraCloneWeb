import { Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const DialogProjectDelete = ({ payload }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Chip
        variant='outlined'
        color='primary'
        sx={{
          borderRadius: '4px',
        }}
        label={`ID: ${payload.id}`}
      />
      <Typography variant='subtitle1' fontWeight={700}>
        {payload.projectName}
      </Typography>
    </Box>
  );
};

export default DialogProjectDelete;
