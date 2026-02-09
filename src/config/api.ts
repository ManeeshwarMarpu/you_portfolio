
const API_BASE = import.meta.env.PROD 
  ? "/api" 
  : "http://localhost:8000"; 

export default API_BASE;