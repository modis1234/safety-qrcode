import * as bridgeAPI from "../api/bridges";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
  createPromiseThunkById,
  handleAsyncActionsById
} from "../lib/asyncUtils";

// 액션타입
const GET_BRIDGES = "bridge/GET_BRIDGES";
const GET_BRIDGES_SUCCESS = "bridge/GET_BRIDGES_SUCCESS";
const GET_BRIDGES_ERROR = "bridge/GET_BRIDGES_ERROR";

const GET_BRIDGE = "bridge/GET_BRIDGE";
const GET_BRIDGE_SUCCESS = "bridge/GET_BRIDGE_SUCCESS";
const GET_BRIDGE_ERROR = "bridge/GET_BRIDGE_ERROR";

const CLEAR_BRIDGE = "bridge/CREAR_BRIDGE";

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니ek.
export const getBridges = createPromiseThunk(GET_BRIDGES, bridgeAPI.getBridges);
// export const getBridge = createPromiseThunk(GET_BRIDGE, bridgeAPI.getBridgesById);
export const getBridge = createPromiseThunkById(GET_BRIDGE, bridgeAPI.getBridgeById);


export const clearBridge = () => ({ type: CLEAR_BRIDGE });

// 초기값
const initialState = {
  bridges: reducerUtils.initial(),
  bridge: reducerUtils.initial(),
};

// 리듀서 생성
const getBridgesReducer = handleAsyncActions(GET_BRIDGES, "bridges", true);
const getBridgeReducer = handleAsyncActionsById(GET_BRIDGE, 'bridge', true);

export default function bridges(state = initialState, action) {
  switch (action.type) {
    case GET_BRIDGES:
    case GET_BRIDGES_SUCCESS:
    case GET_BRIDGES_ERROR:
      return getBridgesReducer(state, action);
    case GET_BRIDGE:
    case GET_BRIDGE_SUCCESS:
    case GET_BRIDGE_ERROR:
      return getBridgeReducer(state, action);
    case CLEAR_BRIDGE:
      return {
        ...state,
        bridge: reducerUtils.initial()
      }
    default:
      return state;
  }
}
