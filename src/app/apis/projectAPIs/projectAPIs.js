import axiosClient from "../axiosClient";

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get("Project/getAllProject");
  },

  getSearchProjects: (keyword) => {
    if (!keyword) {
      return axiosClient.get("Project/getAllProject");
    } else {
      return axiosClient.get("Project/getAllProject", {
        params: {
          keyword: keyword,
        },
      });
    }
  },
  getAllTask: (taskId) => {
    return axiosClient.get("Project/getTaskDetail", {
      params: {
        taskId: taskId,
      },
    });
  },
  getProjectDetail: (id) => {
    const params = new URLSearchParams();
    params.append("id", id);
    return axiosClient.get("Project/getProjectDetail", {
      params,
    });
  },
  getUserProjectId: (idProject) => {
    const params = new URLSearchParams();
    params.append("idProject", idProject);
    return axiosClient.get("Users/getUserByProjectId", {
      params,
    });
  },
  createProject: (projectInfo) => {
    console.log(projectInfo);
    return axiosClient.post("Project/createProjectAuthorize", projectInfo);
  },
  createTask: (taskInfo) => {
    console.log(taskInfo);
    return axiosClient.post("Project/createTask", taskInfo);
  },

  deleteProject: (id) => {
    const params = new URLSearchParams();
    params.append("projectId", id);
    return axiosClient.delete("Project/deleteProject", {
      params,
    });
  },
  updateProject: (projectInfo) => {
    console.log("Api", projectInfo);
    return axiosClient.put("Project/updateProject", projectInfo, {
      params: {
        projectId: projectInfo.id,
      },
    });
  },

  removeTask: (taskId) => {
    const params = new URLSearchParams();
    params.append("taskId", taskId);
    return axiosClient.delete("Project/removeTask", {
      params,
    });
  },
  removeUserFromProject: (userProject) => {
    console.log("");
    return axiosClient.post("Project/removeUserFromProject", userProject);
  },

  assignUser: (userProject) => {
    return axiosClient.post("Project/assignUserProject", userProject);
  },
  assignUserTask: (userTask) => {
    return axiosClient.post("Project/assignUserTask", userTask);
  },
  removeUserFromTask: (userTask) => {
    return axiosClient.post("Project/removeUserFromTask", userTask);
  },
  updateStatusTask: (taskCopy) => {
    console.log(taskCopy);
    return axiosClient.put("Project/updateStatus", taskCopy);
  },
  updateTask: (task) => {
    console.log(task);
    return axiosClient.post("Project/updateTask", task);
  },
};

export default projectAPIs;
