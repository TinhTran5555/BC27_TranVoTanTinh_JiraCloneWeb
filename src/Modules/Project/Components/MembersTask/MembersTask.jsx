import React, { useState, Fragment, useEffect } from "react";
import {
  Avatar,
  Box,
  styled,
  Button,
  Snackbar,
  Alert,
  Select,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { blue, grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useRequest } from "../../../../app/hooks/request/useRequest";
import usersAPIs from "../../../../app/apis/userAPIs/usersAPIs";

import { alertCase, useAlert } from "../../../../app/hooks/alert/useAlert";

import {
  assignUserTaskThunk,
  removeUserFromTaskThunk,
  getSearchTaskThunk,
} from "../../slice/projectSlice";

const StyleAvatar = styled(Avatar)(({ theme }) => ({
  width: "20px",
  height: "20px",
  backgroundColor: blue[300],

}));
const ItemAvatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: blue[300],
  padding: "3px 5px",
  margin: "0px 10px 10px 0",
}));
const NameBox = styled(Box)(({ theme }) => ({
  marginLeft: "5px",
  lineHeight: "20px",
  marginRight: "5px",
}));

const MembersTask = React.memo(({ assigness, taskId }) => {
  const dispatch = useDispatch();
  const { getUser } = usersAPIs;

  const { data: users } = useRequest(getUser);

  const { alertState, dispatchAlert } = useAlert();
  const [isExpand, setIsExpand] = useState(false);
  const [userSelect, setUserSelect] = useState(null);

  const handleChange = (event) => {
    setUserSelect(event.target.value);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatchAlert({ type: alertCase.reset });
  };
  const handleRemoveUser = async (id) => {
    try {
      const data = await dispatch(
        removeUserFromTaskThunk({ taskId, userId: id })
      ).unwrap();
      dispatchAlert({ type: alertCase.success, payload: data });
      dispatch(getSearchTaskThunk(taskId));
      return data;
    } catch (error) {
      dispatchAlert({ type: alertCase.error, payload: error });
    }
  };
  const assignUserHandler = async (id) => {
    const userId = Number(id);

    try {
      const data = await dispatch(
        assignUserTaskThunk({ taskId, userId })
      ).unwrap();
      dispatchAlert({ type: alertCase.success, payload: data });
      dispatch(getSearchTaskThunk(taskId));

      return data;
    } catch (error) {
      dispatchAlert({ type: alertCase.error, payload: error });
    }
  };
  useEffect(() => {}, [assigness]);
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!alertState.successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertState.successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!alertState.errorMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertState.errorMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {assigness?.map((item) => (
          <ItemAvatar key={item.id}>
            <StyleAvatar alt={item.name} src={item.avatar} />
            <NameBox component="span">{item.name}</NameBox>
            <StyleAvatar
              onClick={() => {
                handleRemoveUser(item.id);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </StyleAvatar>
          </ItemAvatar>
        ))}
      </Box>

      <ItemAvatar
        sx={{ width: "fit-content", height: "50px", borderRadius: "10px" }}
        color="success"
      >
        <StyleAvatar onClick={() => setIsExpand((prev) => !prev)}>
          <FontAwesomeIcon icon={!isExpand ? faPlus : faXmarkCircle} />
        </StyleAvatar>
        {!isExpand ? (
          <NameBox component="span">Add User</NameBox>
        ) : (
          <>
            {" "}
            <Select
              sx={{
                height: "30px",
                marginLeft: "5px",
                minWidth: "120px",
              }}
              value={userSelect}
              onChange={handleChange}
              native
              inputProps={{ "aria-label": "Without label" }}
            >
              {users?.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </Select>
            <button
              onClick={() => {
                assignUserHandler(userSelect);
              }}
              style={{
                backgroundColor: "darkturquoise",
                borderWidth: "1px",
                marginLeft: "5px",
                borderRadius: "3px",
              }}
            >
              Add
            </button>
          </>
        )}
      </ItemAvatar>
    </Fragment>
  );
});

export default MembersTask;
