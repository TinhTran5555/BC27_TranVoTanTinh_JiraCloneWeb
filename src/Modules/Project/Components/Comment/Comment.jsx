import {
  Grid,
  Typography,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {

  updateCommentThunk,
  deleteCommentThunk,
  getCommentThunk
} from "../../slice/projectSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ comment, index, taskId }) => {
  const dispatch = useDispatch();

  const [isEditCommnent, setIsEditCommnent] = useState(true);
  const [Comment, setContentComment] = useState("");

  const [indexComment, setIndexComment] = useState();
console.log("comment",comment);
  useEffect(() => {
    setContentComment(comment[indexComment]?.contentComment);
  }, [indexComment]);
  useEffect(() => {
    setContentComment(comment[indexComment]?.contentComment);
  }, [comment]);

  return (
    <Grid container sx={{ textAlign: "left", alignItems: "center", marginBottom: "10px" }}>
      <Grid item xs={2}>
        <Avatar src={comment[index]?.avatar}></Avatar>{" "}
      </Grid>
      <Grid item xs={6}>
        {" "}
        <Typography>{comment[index]?.name}</Typography>
      </Grid>
      <Grid container item xs={4}>
        <Grid item xs={6}>
          <Button
            onClick={() => {
              setIndexComment(index);
              setIsEditCommnent((prev) => !prev);
            }}
            color="success"
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={(e) => {
              e.stopPropagation();

              dispatch(deleteCommentThunk(comment[index]?.id));
              dispatch(getCommentThunk(taskId));

            }}
            color="error"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={2} marginLeft={7}>
        {isEditCommnent ? (
          <Typography>{comment[indexComment]?.contentComment}</Typography>
        ) : (
          <Grid container xs={12} item>
            <Grid item xs={10.5}>
              <TextField
                hiddenLabel
                defaultValue={comment[indexComment]?.contentComment}
                size="small"
                fullWidth
                name="comment"
                onChange={(e) => {
                  setContentComment(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} marginTop={1} gap={2}>
              <Button
                sx={{ width: "20px", height: "20px", marginRight: "5px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  const commentInfo = {
                    contentComment: Comment,
                    id: comment[indexComment]?.id,
                  };

                  dispatch(updateCommentThunk(commentInfo));
                  dispatch(getCommentThunk(taskId));
                }}
                variant="contained"
                color="success"
              >
                Save
              </Button>

              <Button
                sx={{ width: "20px", height: "20px" }}
                onClick={() => {
                  setIsEditCommnent((prev) => !prev);
                }}
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Comment;
