import axios from './myAxios'

export const testApi = async (params: object) => {
  return await axios.get('/api/test', { params });
}

export const testApiPost = async (data: object) => {
  return await axios.post('/api/test/post', data);
}