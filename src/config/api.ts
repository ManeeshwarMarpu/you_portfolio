const isDevelopment = window.location.hostname === "localhost";

const API_BASE = isDevelopment 
  ? "http://localhost:5173" // Your local backend port
  : "https://api.maneeshwar.com"; // Your deployed backend URL

export default API_BASE;