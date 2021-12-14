import axios from 'axios';

const apiInstance = axios.create({
  baseURL: '/api',
});

const apiClient = {
  post: {
    auth: (params: { pwd: string }) => apiInstance.post('/auth', params),
    loveScore: (params: { score: number; reason: string }) => apiInstance.post('/love-score', params),
  },
  get: {
    loveScore: () => apiInstance.get('/love-score'),
    loveScoreResult: () => apiInstance.get('/love-score/result'),
  },
};

export default apiClient;
