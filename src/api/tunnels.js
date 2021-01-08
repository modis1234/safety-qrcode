import axios from 'axios';

// 포스트 목록을 가져오는 비동기 함수
// export const getTunnels = async () => {
//   const response = await axios.get('/tunnels');
//   return response.data;
// };

// // ID로 포스트를 조회하는 비동기 함수
// export const getTunnelById = async (id) => {
// const response = await axios.get(`/tunnels/${id}`);
// return response.data;
// };


// 포스트 목록을 가져오는 비동기 함수
export const getTunnels = async () => {
  const response = await axios.get('/tunnel/tunnels');
  return response.data;
};

// ID로 포스트를 조회하는 비동기 함수
export const getTunnelById = async (id) => {
  const response = await axios.get(`/tunnel/tunnels/${id}`);
  return response.data;
};

