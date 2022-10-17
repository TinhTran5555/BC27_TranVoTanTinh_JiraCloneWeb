import { Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Typography, Box, styled, Chip, colors } from '@mui/material';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Filter from '../Components/Filter/Filter';

const Heading = styled(Box)(({ theme }) => ({
  textAlign: 'left',
}));
const ContactTags = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
}));

const tagsData = [
  {
    label: 'Github',
    icon: '/assets/githubicon.png',
    link: 'https://github.com/hoquocbaoproton/jiraCloner',
  },
  {
    label: 'My Portfolio',
    icon: '/assets/portfolioicon.png',
    link: 'https://github.com/hoquocbaoproton/jiraCloner',
  },
  {
    label: 'hoquocbaocyber@gmail.com',
    icon: '/assets/mail.png',
    link: '#',
  },
];

const Board = () => {
  return (
    <Container maxWidth='xl'>
      <Grid marginTop={2} container>
        <Grid xs={4}>
          <Heading>
            <Typography fontWeight={700} variant='h5' component='h1'>
              Kaban Board
            </Typography>
          </Heading>
        </Grid>
        <Grid xs={8}>
          <ContactTags>
            {tagsData.map((item) => (
              <a
                key={item.label}
                style={{
                  textDecoration: 'none',
                }}
                target='_blank'
                rel='noreferrer'
                href={item.link}
              >
                <Chip
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: colors.grey[300],
                    },
                  }}
                  label={item.label}
                  icon={<img height='70%' src={item.icon} alt={item.label} />}
                />
              </a>
            ))}
          </ContactTags>
        </Grid>
        <Grid mt={3} xs={12}>
          <Filter />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Board;
