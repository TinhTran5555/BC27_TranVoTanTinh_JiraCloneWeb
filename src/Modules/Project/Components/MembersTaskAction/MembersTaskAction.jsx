import React, { useState, useEffect, useCallback } from 'react';

import {
  faPlus,
  faSquareMinus,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  colors,
  Paper,
  styled,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Fade,
  IconButton,
  Typography,
  TextField,
  Grow,
  Button,
  Autocomplete,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Draggable from 'react-draggable';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import { alertCase, useAlert } from '../../../../app/hooks/alert/useAlert';
import usersAPIs from '../../../../app/apis/userAPIs/usersAPIs';
import { useDispatch } from 'react-redux';
import {
  assignUserProjectThunk,
  removeUserFromProjectThunk,
} from '../../slice/projectSlice';

const MembersActionWrapper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '8px',
  overflow: 'hidden',
  top: '100%',
  left: '-100%',
  zIndex: 100,
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.lightBlue[50],
    color: theme.palette.text,
    border: 'none',
    fontWeight: 700,
    fontSize: '14px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: `0.5px solid ${colors.grey[300]}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const { getUser, getUserByProjectId } = usersAPIs;

const CustomizedAutocomplete = (props) => {
  const { data: users } = useRequest(getUser);

  const userOptions = users?.map((item) => ({
    label: item.name,
    userId: item.userId,
  }));

  return (
    <>
      {users && (
        <Grow in={props.in}>
          <Autocomplete
            size='small'
            options={userOptions}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
              option.userId === value.userId
            }
            onChange={(e, option) => props.onSetId(option?.userId)}
            renderOption={(props, option) => (
              <MenuItem {...props} key={option.userId}>
                {option.label}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField {...params} placeholder='Members' />
            )}
          />
        </Grow>
      )}
    </>
  );
};

const MembersTaskAction = React.memo(
  ({ isShowAction, onShowAction, projectId }) => {
    const { data: requestGet, error: getError } = useRequest(
      getUserByProjectId,
      {
        isManual: true,
      }
    );
    const { data: requestDel, error: delError } = useRequest();
    const [members, setMembers] = useState(null);
    const [isExpand, setIsExpand] = useState(false);
    const [userId, setUserId] = useState(null);
    const { alertState, dispatchAlert } = useAlert();

    const dispatch = useDispatch();

    const handleCloseSnack = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatchAlert({ type: alertCase.reset });
    };

    const assignUserHandler = async () => {
      try {
        const data = await dispatch(
          assignUserProjectThunk({ userId, projectId })
        ).unwrap();
        dispatchAlert({ type: alertCase.success, payload: data });
        await getMembersHandler(projectId);
        return data;
      } catch (error) {
        dispatchAlert({ type: alertCase.error, payload: error });
      }
    };

    const deleteMemberHandler = async (userId) => {
      try {
        const data = await dispatch(
          removeUserFromProjectThunk({ projectId, userId })
        ).unwrap();
        dispatchAlert({ type: alertCase.success, payload: data });
        await getMembersHandler(projectId);
        return data;
      } catch (error) {
        dispatchAlert({ type: alertCase.error, payload: error });
      }
    };

    const getMembersHandler = useCallback(
      async (projectId) => {
        try {
          const data = await requestGet(projectId);
          setMembers(data);
          return data;
        } catch (error) {
          return error;
        }
      },
      [requestGet]
    );

    useEffect(() => {
      getMembersHandler(projectId);
    }, []);

    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!alertState.successMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity='success'
            sx={{ width: '100%' }}
          >
            {alertState.successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!!alertState.errorMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity='error'
            sx={{ width: '100%' }}
          >
            {alertState.errorMessage}
          </Alert>
        </Snackbar>
        <Draggable handle='#draggable-head'>
          <Fade in={isShowAction}>
            <MembersActionWrapper>
              <TableContainer sx={{ maxHeight: 480, overflow: 'overlay' }}>
                <Table
                  stickyHeader
                  sx={{ minWidth: 560 }}
                  aria-label='customized table'
                >
                  <TableHead
                    sx={{
                      cursor: 'move',
                    }}
                    id='draggable-head'
                  >
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell align='left'>Avatar</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align='right'>
                        <IconButton
                          size='small'
                          onClick={onShowAction}
                          color='secondary'
                        >
                          <FontAwesomeIcon icon={faXmarkCircle} />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!getError &&
                      members?.map((row) => (
                        <StyledTableRow key={row.userId}>
                          <StyledTableCell component='th' scope='row'>
                            {row.userId}
                          </StyledTableCell>
                          <StyledTableCell align='left'>
                            <Avatar alt={row.name} src={row.avatar} />
                          </StyledTableCell>
                          <StyledTableCell>{row.name}</StyledTableCell>
                          <StyledTableCell align='right'>
                            <IconButton
                              onClick={() => deleteMemberHandler(row.userId)}
                              color='error'
                              size='small'
                            >
                              <FontAwesomeIcon icon={faSquareMinus} />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    <StyledTableRow
                      sx={(theme) => ({
                        transition: 'all ease 0.2s',
                      })}
                      width={'100%'}
                    >
                      <StyledTableCell component='th' scope='row'>
                        <Typography
                          sx={{
                            minWidth: '80px',
                          }}
                          variant='subtitle1'
                          fontWeight={700}
                        >
                          Add more
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align='left'>
                        <IconButton
                          onClick={() => setIsExpand((prev) => !prev)}
                          color='success'
                        >
                          <FontAwesomeIcon
                            icon={!isExpand ? faPlus : faXmarkCircle}
                          />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          minWidth: '120px',
                        }}
                      >
                        <CustomizedAutocomplete
                          onSetId={(userId) => setUserId(userId)}
                          in={isExpand}
                        />
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        <Grow in={isExpand}>
                          <Button
                            onClick={assignUserHandler}
                            color='primary'
                            variant='contained'
                          >
                            Add
                          </Button>
                        </Grow>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </MembersActionWrapper>
          </Fade>
        </Draggable>
      </>
    );
  }
);

export default MembersTaskAction;
