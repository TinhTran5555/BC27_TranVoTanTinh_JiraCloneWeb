import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  AvatarGroup,
  Avatar,
  styled,
  Button,
  colors,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const FilterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '16px',
}));

const avatars = [
  {
    id: '0',
    alt: 'Avatar',
    src: '/assets/avatar/Avatar.jpg',
  },
  {
    id: '1',
    alt: 'Avatar',
    src: '/assets/avatar/Avatar.jpg',
  },
  {
    id: '2',
    alt: 'Avatar',
    src: '/assets/avatar/Avatar.jpg',
  },
];

const FilterAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '8px',
  marginLeft: '16px',
}));

const Filter = () => {
  const [selectedData, setSelectedData] = useState([]);

  const selectedFilterDataHandler = (id) => {
    const isAvatarExist = selectedData.some((item) => item === id);
    if (!isAvatarExist) {
      setSelectedData((prev) => [...prev, id]);
      return;
    }
    if (isAvatarExist) {
      const updatedData = selectedData.filter((item) => item !== id);
      setSelectedData(updatedData);
      return;
    }
  };

  const styledAvatar = (theme, id) => {
    const isAvatarExist = selectedData.some((item) => item === id);
    return {
      transform: isAvatarExist ? 'translateY(-4px)' : '',
      outline: isAvatarExist
        ? `2px solid ${theme.palette.primary.main}`
        : undefined,
      zIndex: isAvatarExist ? 1 : null,
    };
  };

  return (
    <FilterWrapper>
      <TextField
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ marginRight: '8px' }} position='start'>
              <FontAwesomeIcon icon={faSearch} />
            </InputAdornment>
          ),
        }}
      />
      <AvatarGroup>
        {avatars.map((item) => (
          <Avatar
            sx={(theme) => ({
              cursor: 'pointer',
              transition: 'all ease 0.1s',
              ...styledAvatar(theme, item.id),
              '&:hover': {
                transform: 'translateY(-4px)',
                zIndex: 1,
              },
            })}
            key={item.id}
            src={item.src}
            alt={item.alt}
            onClick={() => selectedFilterDataHandler(item.id)}
          />
        ))}
      </AvatarGroup>
      <FilterAction>
        <Button variant='text' size='medium'>
          Only my issues
        </Button>
        <Button variant='text' size='medium'>
          Ignore Resolve
        </Button>
      </FilterAction>
    </FilterWrapper>
  );
};

export default Filter;
