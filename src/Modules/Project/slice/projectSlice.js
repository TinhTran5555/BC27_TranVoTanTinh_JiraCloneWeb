import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import thunk from '../../../app/apis/helper/thunk';
import projectAPIs from '../../../app/apis/projectAPIs/projectAPIs';

const initialState = {
  projects: [],
  projectDetail: [],
  isLoading: false,
  error: '',
};

const {
  getAllProjects,
  getProjectDetail,
  createProject,
  deleteProject,
  updateProject,
  assignUser,
  removeUserFromProject,
  getSearchProjects
} = projectAPIs;

export const getAllProjectsThunk = thunk.request(
  'project/getAllProjects',
  getAllProjects
);

export const getSearchProjectsThunk = createAsyncThunk(
  "project/getSearchProjects",
  async (keyword, { rejectWithValue }) => {
    try {
      const data = await getSearchProjects(keyword);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getProjectDetailThunk = thunk.request(
  'project/getProjectDetail',
  getProjectDetail
);

export const createProjectThunk = thunk.request(
  'project/createProject',
  createProject
);
export const updateProjectThunk = createAsyncThunk(
  "project/getUpdateProjects",
  async (projectInfo, { rejectWithValue }) => {
    console.log("Thunk", projectInfo);
    try {
      const data = await updateProject(projectInfo);
      return data;
    } catch (error) {  
      return rejectWithValue(error);
    }
  }
);


// export const updateProjectThunk = thunk.request(
//   'project/eidtProject',
//   updateProject
// );

export const deleteProjectThunk = thunk.request(
  'project/deleteProject',
  deleteProject
);

export const removeUserFromProjectThunk = thunk.request(
  'project/removeUserFromProject',
  removeUserFromProject
);

export const assignUserProjectThunk = thunk.request(
  'project/assignUserProject',
  assignUser
);

const projectSlice = createSlice({
  name: 'project',
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
      .addCase(getProjectDetailThunk.pending, (state) => {
       
      })
      .addCase(getProjectDetailThunk.fulfilled, (state, { payload }) => {
       
        state.projectDetail = payload;
      })
      .addCase(getProjectDetailThunk.rejected, (state, { payload }) => {
      
        state.error = payload;
     
      });
  },
});

export default projectSlice.reducer;
