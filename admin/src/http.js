import Axios from 'axios';

const http = Axios.create({
  baseURL: "http://localhost:3000/admin/api"
});

export default http;