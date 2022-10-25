import  axiosClient  from '../axiosClient';

const priorityList = {
  getPriorityList: () => {
    return axiosClient.get('Priority/getAll');
  },
};

export default priorityList;
