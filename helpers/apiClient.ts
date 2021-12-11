import axios from 'axios';

const apiInstance = axios.create({
  baseURL: '/api',
});

const apiClient = {
  post: {
    auth: (params: { pwd: string }) => apiInstance.post('/auth', params),
  },
};

export default apiClient;
