import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN || "http://localhost:5000/api";

const fetchData = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export default fetchData;
