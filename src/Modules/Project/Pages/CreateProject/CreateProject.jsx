import React, { useReducer, useState } from "react";
import "draft-js/dist/Draft.css";
import {
  Chip,
  InputLabel,
  Box,
  TextField,
  Typography,
  colors,
  alpha,
  styled,
  Alert,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/system";
import { useRequest } from "../../../../app/hooks/request/useRequest";
import projectCategory from "../../../../app/apis/projectCategory/projectCategory";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { createProjectThunk } from "../../slice/projectSlice";

const { getProjectCategory } = projectCategory;

const categoryProjectMap = {
  app: "Dự án phần mềm",
  web: "Dự án web",
  mobile: "Dự án di động",
};

const CategorySelection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  gap: "8px",
  alignItems: "center",
}));

const alertCase = {
  loading: "ALERT_LOADING",
  error: "ALERT_ERROR",
  success: "ALERT_SUCCESS",
};

const initialAlertState = {
  isLoading: false,
  errorMessage: "",
  successMessage: "",
};

const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case alertCase.loading:
      return {
        ...state,
        isLoading: true,
      };
    case alertCase.error:
      return {
        ...state,
        isLoading: false,
        successMessage: "",
        errorMessage: payload,
      };
    case alertCase.success:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        successMessage: "Create Project Successfully",
      };
    default:
      return state;
  }
};

const CreateProject = () => {
  const { data: projectCategory } = useRequest(getProjectCategory);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [alertState, dispatchAlert] = useReducer(
    alertReducer,
    initialAlertState
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      projectName: "",
    },
  });

  const onSubmit = async ({ projectName }) => {
    try {
      dispatchAlert({ type: alertCase.loading });
      if (!selectedCategory) {
        dispatchAlert({
          type: alertCase.error,
          payload: "You haven't selected category",
        });
        return;
      }

      const projectInfo = {
        projectName,
        selectedCategory,
        description,
      };

      console.log(projectInfo);
      const data = await dispatch(createProjectThunk(projectInfo)).unwrap();
      dispatchAlert({
        type: alertCase.success,
      });

      return data;
    } catch (error) {
      console.log(error);
      dispatchAlert({
        type: alertCase.error,
        payload: error,
      });
    }
  };

  const selectCategoryHandler = (id) => {
    if (selectedCategory !== id) {
      setSelectedCategory(id);
    } else {
      setSelectedCategory(null);
    }
  };

  const activeCategoryStyle = (id, theme) => {
    if (selectedCategory === id) {
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
      };
    }
  };

  const handleEditorChange = (content, editor) => {
    setDescription(content);
  };

  return (
    <Container sx={{ marginTop: "32px" }} maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" fontWeight={700}>
          Create New Project
        </Typography>
        <Grid2 sx={{ textAlign: "left" }} container>
          <Grid2 marginTop={2} xs={4}>
            <InputLabel
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: colors.grey[900],
              }}
            >
              Project Name
            </InputLabel>
            <TextField
              size="small"
              placeholder="Input your project's name"
              {...register("projectName", {
                required: {
                  value: true,
                  message: "This is required",
                },
                pattern: {
                  value: /^[^'"!@#$%^&*()?,:;~`+=-]*$/,
                  message: "Not contain special character",
                },
              })}
              fullWidth
              color={errors.projectName ? "error" : ""}
              error={!!errors.projectName}
              helperText={errors.projectName?.message}
            />
          </Grid2>
        </Grid2>
        <Grid2 marginTop={2} container>
          <Grid2 marginBottom={1} xs={12}>
            <Typography
              sx={{ display: "block" }}
              align="left"
              variant="subtitle1"
              fontWeight={700}
            >
              Write description
            </Typography>
          </Grid2>
          <Grid2 xs={8}>
            <Editor
              placeholder="Write your project's description... "
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={handleEditorChange}
            />
          </Grid2>
        </Grid2>
        <Grid2 marginTop={2} container>
          <Grid2 xs={12}>
            <Typography
              sx={{ display: "block", marginBottom: "16px" }}
              align="left"
              variant="subtitle1"
              fontWeight={700}
            >
              Project Category
            </Typography>
            <Grid2 xs={12}>
              <CategorySelection>
                {projectCategory?.map((item) => (
                  <Chip
                    key={item.id}
                    sx={(theme) => ({
                      color:
                        item.projectCategoryName === categoryProjectMap["app"]
                          ? theme.palette.primary.light
                          : item.projectCategoryName ===
                            categoryProjectMap["web"]
                          ? colors.green[500]
                          : colors.amber[500],
                      backgroundColor:
                        item.projectCategoryName === categoryProjectMap["app"]
                          ? alpha(theme.palette.primary.light, 0.2)
                          : item.projectCategoryName ===
                            categoryProjectMap["web"]
                          ? colors.green[50]
                          : colors.amber[50],
                      "&:hover": {
                        backgroundColor:
                          selectedCategory === item.id
                            ? theme.palette.secondary.light
                            : item.projectCategoryName ===
                              categoryProjectMap["app"]
                            ? alpha(theme.palette.primary.main, 0.2)
                            : item.projectCategoryName ===
                              categoryProjectMap["web"]
                            ? colors.green[100]
                            : colors.amber[100],
                      },
                      ...activeCategoryStyle(item.id, theme),
                    })}
                    onClick={() => selectCategoryHandler(item.id)}
                    label={item.projectCategoryName}
                  />
                ))}
              </CategorySelection>
              <InputLabel></InputLabel>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 marginTop={4} container>
          <Box>
            <Button
              type="submit"
              sx={{ borderRadius: "8px" }}
              variant="contained"
              color="primary"
              disabled={alertState.isLoading}
            >
              Add Project
            </Button>
          </Box>
        </Grid2>
      </form>
      <Grid2 container>
        <Grid2>
          <Box marginTop={4}>
            {alertState.errorMessage ? (
              <Alert severity="error">{alertState.errorMessage}</Alert>
            ) : alertState.successMessage ? (
              <Alert severity="success">{alertState.successMessage}</Alert>
            ) : null}
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CreateProject;
