import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const call = axios.create({
  baseURL: BASE_URL,
});

export const getRooms = () => call.get("rooms/").then((res) => res.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) =>
  call.get(`rooms/${queryKey[1]}`).then((res) => res.data);

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) =>
  call.get(`rooms/${queryKey[1]}/reviews`).then((res) => res.data);
