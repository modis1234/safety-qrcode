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
      console.log(action.data);
      const stateData = state.bridges.data;
      console.log(stateData);
      const result = stateData.concat(action.data);
      const stateBridges = state.bridges;

      const inputData = {
        ...stateBridges,
        data: result,
      };
      console.log("inputData-->", inputData);
      const _state = {
        ...state,
        bridges: inputData,
      };
      state = _state;
      return state;
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

export function postBridge(dispatch) {
  const data = {
    id: 36,
    bridge_index: "DSBR9999",
    bridge_nm: "교량D",
    bulider_nm: "두산건설(주)",
    code_index: null,
    comm_seq: 1,
    created_date: "2020-12-31T08:21:19.000Z",
    developer_nm: "한국도로공사",
    form: null,
    location: "본선 STA. 6+084.7~6+455.2",
    site_nm: "고속도로 제14호 함양-울산선(함양-합천) 건설공사 제 3공구",
    spec: 371,
  };
  dispatch({ type: "POST_BRIDGE", data });
  // try {
  //   const response = api.postBridge(data);
  //   dispatch({ type: "POST_BRIDGE", data: response });
  // } catch (e) {
  //   dispatch({ type: "GET_BRIDGES_ERROR", error: e });
  // }
}
