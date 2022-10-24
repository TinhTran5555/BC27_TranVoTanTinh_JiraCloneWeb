import { Box } from "@mui/system";
import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginHandler,
  signUpHandler,
  testThunkLogin,
} from "./Modules/Auth/slice/authSlice";
import "./App.css";
import Board from "./Modules/Board/Pages/Board";
import Loader from "./UI/Display/Loader/Loader";
import { authSelector } from "./app/store";
import Login from "./Modules/Auth/Components/Login";
import Register from "./Modules/Auth/Components/Register";
import CheckoutRoute from "./Routes/CheckoutRoute";

const MainLayout = React.lazy(() => import("./UI/Layout/MainLayout/Pages"));
const ProjectDetail = React.lazy(() =>
  import("./Modules/Project/Pages/ProjectDetail")
);
const Project = React.lazy(() => import("./Modules/Project/Pages/Project"));
const CreateProject = React.lazy(() =>
  import("./Modules/Project/Pages/CreateProject")
);
const EditProject = React.lazy(() =>
  import("./Modules/Project/Components/EditProject")
);
const Task = React.lazy(() => import("./Modules/Project/Pages/Task"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <>
            <Box height={160} />
            <Loader />
          </>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <CheckoutRoute>
                <MainLayout path="/" />
              </CheckoutRoute>
            }
          ></Route>
          <Route path="/" element={<CheckoutRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/project" element={<Project />} />
              <Route
                path="/project/create-project"
                element={<CreateProject />}/>
              <Route path="/project/edit-project" element={<EditProject />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/project/:projectId/:taskId" element={<Task />} />
            </Route>
          </Route>

          <Route path="/">
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
