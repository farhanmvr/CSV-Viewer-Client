import axios from 'axios';

export const convert = async (file) =>
  axios.post(`${process.env.REACT_APP_API}/file`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
