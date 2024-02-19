import axios from './myAxios'

export const testApi = async () => {
  return await axios.get('/api/test');
}