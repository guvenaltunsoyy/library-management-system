import axios from "axios";

export default axios.create({
  baseURL: `http://lib-mng-server.herokuapp.com/api/`,
});
