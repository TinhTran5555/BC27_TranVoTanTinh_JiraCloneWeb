import  axiosClient  from '../axiosClient';

const projectCategory = {
  getProjectCategory: () => {
    return axiosClient.get('ProjectCategory');
  },
};

export default projectCategory;
