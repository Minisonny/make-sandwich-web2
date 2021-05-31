/* eslint-disable camelcase */
import { SERVER_URL } from "./constant.js";
import axios from "axios";

export const getAllSandwich = async () => {
  return await axios.get(`${SERVER_URL}/v1/sandwich`).then(res => res.data);
};

export const getSandwich = async sandwichId => {
  return await axios
    .get(`${SERVER_URL}/v1/sandwich/${sandwichId}`)
    .then(res => res.data);
};

export const updateASandwich = async (sandwichObject, key) => {
  const config = {
    headers: {
      "x-api-key": key
    }
  };
  return await axios
    .put(
      `${SERVER_URL}/v1/sandwich/${sandwichObject.id}`,
      sandwichObject,
      config
    )
    .then(res => res.data);
};

export const deleteASandwich = async (sandwichId, key) => {
  const config = {
    headers: {
      "x-api-key": key
    }
  };
  return await axios
    .delete(`${SERVER_URL}/v1/sandwich/${sandwichId}`, config)
    .then(res => res.data);
};

export const addASandwich = async (sandwichObject, key) => {
  const config = {
    headers: {
      "x-api-key": key
    }
  };
  return await axios
    .post(`${SERVER_URL}/v1/sandwich`, sandwichObject, config)
    .then(res => res.data);
};
