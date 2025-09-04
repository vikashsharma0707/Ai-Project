// // import axios from 'axios';

// // export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

// // const http = axios.create({
// //   baseURL: API_BASE,
// //   withCredentials: false
// // });

// // http.interceptors.request.use((config)=>{
// //   const token = localStorage.getItem('token');
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // export default http;


// import axios from "axios";

// export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// const http = axios.create({
//   baseURL: API_BASE,
//   withCredentials: false
// });

// // Attach JWT automatically
// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default http;

import axios from "axios";

// 👉 named export bhi do, taa-ki slices/components import kar saken
export const API_BASE =
  (import.meta.env.VITE_API_BASE || "http://localhost:5000").replace(/\/+$/, "");

const http = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// Attach token if present
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
