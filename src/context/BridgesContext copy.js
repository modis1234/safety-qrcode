import React, { createContext, useReducer, useContext } from "react";
import {
  createAsyncDispatcher,
  initialAsyncState,
  createAsyncHandler,
} from "../uitils/asyncActionUtils";
import * as api from "../uitils/api";

// UsersContext 에서 사용 할 기본 상태
const initialState = {
  bridges: initialAsyncState,
  bridge: initialAsyncState,
};

const bridgesHandler = createAsyncHandler("GET_BRIDGES", "bridges");
const bridgeHandler = createAsyncHandler("GET_BRIDGE", "bridge");

/**
 * bridge/FINDBYALL
 * bridge/FINDBYID
 * bridge/POST
 * bridge/PUT
 * bridge/DELETE
 * bridge/SUCCESS
 * bridge/DEL
 */

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function bridgesReducer(state, action) {
  switch (action.type) {
    case "GET_BRIDGES":
    case "GET_BRIDGES_SUCCESS":
    case "GET_BRIDGES_ERROR":
      return bridgesHandler(state, action);
    case "GET_BRIDGE":
    case "GET_BRIDGE_SUCCESS":
    case "GET_BRIDGE_ERROR":
      return bridgeHandler(state, action);
    case "POST_BRIDGE":
      return state.concat(action.bridge);
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
const BridgesStateContext = createContext(null);
const BridgesDispatchContext = createContext(null);

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
export function BridgesProvider({ children }) {
  const [state, dispatch] = useReducer(bridgesReducer, initialState);

  return (
    <BridgesStateContext.Provider value={state}>
      <BridgesDispatchContext.Provider value={dispatch}>
        {children}
      </BridgesDispatchContext.Provider>
    </BridgesStateContext.Provider>
  );
}

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useBridgesState() {
  const state = useContext(BridgesStateContext);
  if (!state) {
    throw new Error("Cannot find BridgesProvider");
  }
  return state;
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useBridgesDispatch() {
  const dispatch = useContext(BridgesDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find BridgesProvider");
  }
  return dispatch;
}
export const getBridges = createAsyncDispatcher("GET_BRIDGES", api.getBridges);
export const getBridge = createAsyncDispatcher("GET_BRIDGE", api.getBridge);

export const postBridge = createAsyncDispatcher("POST_BRIDGE", api.postBridge);
