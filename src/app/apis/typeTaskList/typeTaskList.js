import  axiosClient  from '../axiosClient';

const typeTaskList = {
  getTypeTaskList: () => {
    return axiosClient.get('TaskType/getAll');
  },
};

export default typeTaskList;
