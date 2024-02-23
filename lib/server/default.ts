import axios from './axiosService'

export const testApi = async (params: object) => {
  return await axios.get('/api/test', { params, retryCounts: 3 });
}

export const testApiPost = async (data: object) => {
  return await axios.post('/api/test/post', data, { retryCounts: 2 });
}