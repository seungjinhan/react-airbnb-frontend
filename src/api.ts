import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
const BASE_URL = "http://localhost:8000/api/v1";

const call = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getRooms = () => call.get("rooms/").then((res) => res.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) =>
  call.get(`rooms/${queryKey[1]}`).then((res) => res.data);

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) =>
  call.get(`rooms/${queryKey[1]}/reviews`).then((res) => res.data);

export const getMe = () => call.get(`users/me`).then((res) => res.data);

export const logout = () =>
  call
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((res) => res.data);

export const githubLogin = (code: string) =>
  call
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((res) => res.status);

export const kakaoLogin = (code: string) =>
  call
    .post(
      `/users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((res) => res.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  call.post(
    `/users/log-in`,
    { username, password },
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }
  );

export const getAmenities = () =>
  call.get(`rooms/amenities`).then((res) => res.data);

export const getCategories = () =>
  call.get(`categories`).then((res) => res.data);
