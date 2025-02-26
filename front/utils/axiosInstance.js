import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://react-vercel-smoky.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
