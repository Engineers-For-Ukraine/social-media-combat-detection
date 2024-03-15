import axios from "axios";

export default axios.create({
  baseURL: "https://live-halibut-partially.ngrok-free.app/api",
  headers: {
    "Content-type": "application/json"
  }
});
