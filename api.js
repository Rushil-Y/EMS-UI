const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/graphql"
    : "https://rushils-ems-server.vercel.app/graphql";

export default API_URL;
