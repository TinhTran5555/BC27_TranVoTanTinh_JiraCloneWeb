import  axiosClient  from '../axiosClient';

const statusList = {
  getStatusList: () => {
    return axiosClient.get('Status/getAll');
  },
};

export default statusList;
