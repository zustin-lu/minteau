import axios from 'axios';

const apiInstance = axios.create({
  baseURL: '/api',
});

const apiClient = {
  post: {
    auth: (params: { pwd: string; user: string }) =>
      apiInstance.post('/auth', params),
    feed: (params: any) => apiInstance.post('/feed', params),
    loveScore: (params: { score: number; reason: string }) =>
      apiInstance.post('/love-score', params),
  },
  get: {
    loveScore: () => apiInstance.get('/love-score'),
    loveScoreResult: () => apiInstance.get('/love-score/result'),
    feeds: () => apiInstance.get('/feed'),
  },
  delete: {
    feed: (id: string) => apiInstance.delete('/feed', { params: { id } }),
  },
};

export default apiClient;
