import { SERVER_URL } from "./constant.js";
import axios from "axios";

export const createUser = async (user, apiKey) => {
  return await axios
    .post(`${SERVER_URL}/v1/user`, user, { headers: { "x-api-key": apiKey } })
    .then(res => res.data);
};

export const logUserIntoSystem = async user => {
  return await axios
    .post(`${SERVER_URL}/v1/user/login`, user)
    .then(res => res.data);
};

export const logOutUser = async username => {
  const body = {
    username: username
  };
  return await axios.post(`${SERVER_URL}/v1/user/logout`, body);
};

export const getUserByUserName = async username => {
  return await axios
    .get(`${SERVER_URL}/v1/user/${username}`)
    .then(res => res.data);
};

export const updateUser = async (username, user, key) => {
  const config = {
    headers: {
      "x-api-key": key
    }
  };
  return await axios
    .put(`${SERVER_URL}/v1/user/${username}`, user, config)
    .then(res => res.data);
};

export const deleteUser = async (username, key) => {
  const config = {
    headers: {
      "x-api-key": key
    }
  };
  return await axios.delete(`${SERVER_URL}/v1/user/${username}`, config);
};

export const getLatestAPIkey = async username => {
  const response = await axios.get(`${SERVER_URL}/v1/user/apikey/${username}`);
  return response.data;
};
