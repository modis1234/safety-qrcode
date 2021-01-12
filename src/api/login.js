import axios from "axios";

// 계정 목록을 가져오는 비동기 함수
export const getBridges = async () => {
  const response = await axios.get("/account/accounts");
  return response.data;
};

// ID로 계정를 조회하는 비동기 함수
export const getBridgeById = async (id) => {
  const response = await axios.get(`/account/accounts/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postBridge = async (data) => {
  const response = await axios.post(`/account/accounts`, data);
  return response.data;
};

// LOGIN POST 비동기 함수
export const loginAccount = async (data) => {
  const response = await axios.post(`/account/accounts/login`, data);
  return response.data;
};
// LOGOUT POST 비동기 함수
export const logoutAccount = async (data) => {
  const response = await axios.post(`/account/accounts/logout`, data);
  return response.data;
};
