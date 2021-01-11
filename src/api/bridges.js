import axios from 'axios';

// 포스트 목록을 가져오는 비동기 함수
export const getBridges = async () => {
  const response = await axios.get('/bridge/bridges');
  return response.data;
};

// ID로 포스트를 조회하는 비동기 함수
export const getBridgeById = async (id) => {
  const response = await axios.get(`/bridge/bridges/${id}`);
  return response.data;
};

// 데이터 추가를 위한 POST 비동기 함수
export const postBridge = async (data) => {
  const response = await axios.post(`/bridge/bridges`, data);
  return response.data;
}