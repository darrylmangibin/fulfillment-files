import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3030/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
