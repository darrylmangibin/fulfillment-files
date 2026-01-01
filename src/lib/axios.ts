import Axios from "axios";

const getBaseURL = () => {
  // In production, use the current domain's API
  if (typeof window !== "undefined") {
    // Client-side: use the current origin
    return `${window.location.origin}/api`;
  }
  
  // Server-side: use environment variable or fallback
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  
  // Fallback for local development
  return "http://localhost:3030/api";
};

const axios = Axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
