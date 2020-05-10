import axios from 'axios';

export const makeRequest = async (path: string, body?: any): Promise<any> => {
  if (body == null) {
    const { data } = await axios.get(`/.netlify/functions/${path}`);
    return data;
  } else {
    const { data } = await axios.post(`/.netlify/functions/${path}`, JSON.stringify(body))
    return data;
  }
}