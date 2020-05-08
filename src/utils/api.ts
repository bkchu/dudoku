import axios from 'axios';

export const makeRequest = async (path: string): Promise<any> => {
  const { data } = await axios.get(`/.netlify/functions/${path}`);
  return data;
}