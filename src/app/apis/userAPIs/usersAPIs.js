import  axiosClient  from '../axiosClient';

const usersAPIs = {
  getUser: () => {
    return axiosClient.get('Users/getUser');
  },

  getUserByProjectId: (idProject) => {
    return axiosClient.get('Users/getUserByProjectId', {
      params: {
        idProject: idProject,
      },
    });
  },

  deleteUser: (id) => {
    const params = new URLSearchParams();
    params.append('id', id);
    return axiosClient.delete('Users/deleteUser', {
      params,
    });
  },
};

export default usersAPIs;
