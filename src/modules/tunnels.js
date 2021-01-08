import * as tunnelAPI from "../api/tunnels";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
  createPromiseThunkById,
  handleAsyncActionsById
} from "../lib/asyncUtils";

// 액션타입
const GET_TUNNELS = "tunnel/GET_TUNNELS";
const GET_TUNNELS_SUCCESS = "tunnel/GET_TUNNELS_SUCCESS";
const GET_TUNNELS_ERROR = "tunnel/GET_TUNNELS_ERROR";

const GET_TUNNEL = "tunnel/GET_TUNNEL";
const GET_TUNNEL_SUCCESS = "tunnel/GET_TUNNEL_SUCCESS";
const GET_TUNNEL_ERROR = "tunnel/GET_TUNNEL_ERROR";

const CLEAR_TUNNEL = "tunnel/CREAR_TUNNEL";

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니ek.
export const getTunnels = createPromiseThunk(GET_TUNNELS, tunnelAPI.getTunnels);
export const getTunnel = createPromiseThunkById(GET_TUNNEL, tunnelAPI.getTunnelById);


export const clearTunnel = () => ({ type: CLEAR_TUNNEL });

// 초기값
const initialState = {
  tunnels: reducerUtils.initial(),
  tunnel: reducerUtils.initial(),
};

// 리듀서 생성
const getTunnelsReducer = handleAsyncActions(GET_TUNNELS, "tunnels", true);
const getTunnelReducer = handleAsyncActionsById(GET_TUNNEL, 'tunnel', true);

export default function tunnels(state = initialState, action) {
  switch (action.type) {
    case GET_TUNNELS:
    case GET_TUNNELS_SUCCESS:
    case GET_TUNNELS_ERROR:
      return getTunnelsReducer(state, action);
    case GET_TUNNEL:
    case GET_TUNNEL_SUCCESS:
    case GET_TUNNEL_ERROR:
      return getTunnelReducer(state, action);
    case CLEAR_TUNNEL:
      return {
        ...state,
        tunnel: reducerUtils.initial()
      }
    default:
      return state;
  }
}
