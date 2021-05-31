import { SERVER_URL } from "./constant.js";
import axios from "axios";

export const getAllOrders = async () => {
  return await axios.get(`${SERVER_URL}/v1/order`).then(res => res.data);
};

export const addAnOrder = async order => {
  return await axios
    .post(`${SERVER_URL}/v1/order`, order)
    .then(res => res.data);
};

export const getOrder = async id => {
  return await axios.get(`${SERVER_URL}/v1/order/${id}`).then(res => res.data);
};
