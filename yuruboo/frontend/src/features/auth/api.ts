import axios from "axios";
import { SignupUser } from "./types";

export const fetchAsyncLoginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/auth/login/`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchAsyncLogoutUser = async () => {
  try {
    await axios.post(
      `http://localhost:8000/api/auth/logout/`,
      {}, // 空のPOSTリクエストを使用
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchAsyncTokenVerify = async () => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/verify/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const fetchAsyncTokenRefresh = async () => {
  await axios.post(
    "http://localhost:8000/api/auth/refresh/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const fetchAsyncSignup = async (props: SignupUser) => {
  const formedData = {
    first_name: props.firstName,
    last_name: props.lastName,
    email: props.email,
    password: props.password,
  };
  await axios.post("http://localhost:8000/api/auth/users/", formedData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};