import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import useUserStore from '../state/userStore';

const useAxios = () => {
  const navigate = useNavigate();
  const userStore = useUserStore()

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 180000
  }); 
  console.log("ENV"+process.env.BASE_URL)
  api.interceptors.request.use(
    async (config) => {
        if(userStore.token){
            config.headers["Authorization"] = `Bearer ${userStore.token}`
        }
        return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate('/auth');
      }
      return Promise.reject(error);
    },
  );

  return { api };
};

export default useAxios;