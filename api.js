const API_URL = window.location.hostname.includes("vercel.app")
  ? "https://rushils-ems-server.vercel.app/graphql"
  : "http://localhost:5000/graphql";

export default API_URL;
