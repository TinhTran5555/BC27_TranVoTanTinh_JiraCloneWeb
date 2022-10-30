import { createSlice, } from "@reduxjs/toolkit";
import thunk from "../../../app/apis/helper/thunk";
import projectAPIs from "../../../app/apis/projectAPIs/projectAPIs";

const initialState = {
  projects: [],
  projectDetail: [],
  taskDetail: [],
  userProject: [],
  isLoading: false,
  error: "",
};

const {
  getAllProjects,
  getProjectDetail,
  createProject,
  deleteProject,
  updateProject,
  assignUser,
  removeUserFromProject,
  getSearchProjects,
  getAllTask,
  removeUserFromTask,
  assignUserTask,
  updateStatusTask,
  updateTask,
  removeTask,
  createTask,
  getUserProjectId
} = projectAPIs;

export const getAllProjectsThunk = thunk.request(
  "project/getAllProjects",
  getAllProjects
);

export const getSearchTaskThunk = thunk.request("task/getAllTask", getAllTask);
export const updateTaskThunk = thunk.request("task/updateTask", updateTask);

export const getSearchProjectsThunk = thunk.request(
  "project/getSearchProjects",
  getSearchProjects
);
export const getProjectDetailThunk = thunk.request(
  "project/getProjectDetail",
  getProjectDetail
);

export const createProjectThunk = thunk.request(
  "project/createProject",
  createProject
);

export const updateProjectThunk = thunk.request(
  "project/getUpdateProjects",
  updateProject
);

export const deleteProjectThunk = thunk.request(
  "project/deleteProject",
  deleteProject
);

export const removeUserFromProjectThunk = thunk.request(
  "project/removeUserFromProject",
  removeUserFromProject
);

export const assignUserProjectThunk = thunk.request(
  "project/assignUserProject",
  assignUser
);
export const removeUserFromTaskThunk = thunk.request(
  "task/removeUserFromTask",
  removeUserFromTask
);
export const assignUserTaskThunk = thunk.request(
  "task/assignUserTask",
  assignUserTask
);
export const updateStatusTaskThunk = thunk.request(
  "task/updateStatusTask",
  updateStatusTask
);
export const getUserByProjectIdThunk = thunk.request(
  "task/getUserProjectId",
  getUserProjectId
);
export const removeTaskThunk = thunk.request("task/removeTask", removeTask);
export const createTaskThunk = thunk.request("task/createTask", createTask);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjectsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = payload;
      })
      .addCase(getAllProjectsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
    builder
      .addCase(getSearchProjectsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProjectsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = payload;
      })
      .addCase(getSearchProjectsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
    builder
      .addCase(getProjectDetailThunk.pending, (state) => {})
      .addCase(getProjectDetailThunk.fulfilled, (state, { payload }) => {
        state.projectDetail = payload;
      })
      .addCase(getProjectDetailThunk.rejected, (state, { payload }) => {
        state.error = payload;
      });
    builder
      .addCase(getSearchTaskThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.taskDetail = payload;
      })
      .addCase(getSearchTaskThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
      builder
      .addCase(getUserByProjectIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByProjectIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userProject = payload;
      })
      .addCase(getUserByProjectIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default projectSlice.reducer;
