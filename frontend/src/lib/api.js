import axios from "axios";

export const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? "/api" : "http://localhost:4000/api");
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ??
  (import.meta.env.PROD
    ? window.location.origin
    : "http://localhost:4000");

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
