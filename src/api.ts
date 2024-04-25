import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const call = axios.create({
  baseURL: BASE_URL,
});

export const getRooms = () => call.get("rooms/").then((res) => res.data);
