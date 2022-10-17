import React, { useState } from 'react';
import { Avatar, AvatarGroup, Box } from '@mui/material';
import MembersAction from '../MembersAction/MembersAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Members = React.memo(({ projectId, members }) => {
  const [isShowAction, setIsShowAction] = useState(false);

  const setIsShowActionHandler = () => {
    setIsShowAction((prev) => !prev);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <AvatarGroup
        onClick={setIsShowActionHandler}
        sx={{ cursor: 'pointer' }}
        max={3}
      >
        {members.map((item) => (
          <Avatar key={item.userId} alt={item.name} src={item.avatar} />
        ))}
        <Avatar>
          <FontAwesomeIcon icon={faPlus} />
        </Avatar>
      </AvatarGroup>
      <MembersAction
        projectId={projectId}
        onShowAction={setIsShowActionHandler}
        isShowAction={isShowAction}
      />
    </Box>
  );
});

export default Members;
