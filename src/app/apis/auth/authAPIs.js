import  axiosClient  from '../axiosClient';

const authAPIs = {
  signIn: (user) => {
    return axiosClient.post('Users/signin', user);
  },
  signUp: (userInfo) => {
    return axiosClient.post('Users/signup', userInfo);
  },
};

export default authAPIs;
