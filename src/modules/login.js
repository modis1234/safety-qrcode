import * as loginAPI from "../api/login";

// 액션타입
const LOGIN_ACCOUNT = "account/LOGIN_ACCOUNT";
const LOGIN_ACCOUNT_SUCCESS = "account/LOGIN_ACCOUNT_SUCCESS";
const LOGIN_ACCOUNT_ERROR = "account/LOGIN_ACCOUNT_ERROR";

const LOGOUT_ACCOUNT = "account/LOGOUT_ACCOUNT";
const LOGOUT_ACCOUNT_SUCCESS = "account/LOGOUT_ACCOUNT_SUCCESS";
const LOGOUT_ACCOUNT_ERROR = "account/LOGOUT_ACCOUNT_ERROR";

// 액션 trunk 함수
export const loginAsync = (data) => async(dispatch) => {
  // 요청시작
  dispatch({ type: LOGIN_ACCOUNT });
  try {
    // API 호출
    const payload = await loginAPI.loginAccount(data);
    // 성공했을 때
    dispatch({ type: LOGIN_ACCOUNT_SUCCESS, payload });
  } catch (e) {
    // 실패했을 때
    dispatch({ type: LOGIN_ACCOUNT_ERROR, error: e });
  }
};

export const logOutAsync = (data) => async(dispatch) => {
    // 요청시작
    dispatch({ type: LOGOUT_ACCOUNT });
    try {
      // API 호출
      const payload = await loginAPI.logoutAccount(data);
      // 성공했을 때
      dispatch({ type: LOGOUT_ACCOUNT_SUCCESS, payload });
    } catch (e) {
      // 실패했을 때
      dispatch({ type: LOGOUT_ACCOUNT_ERROR, error: e });
    }
  };

// 초기값
const initialState = {
    login: {
        loading: false,
        data: null,
        error: null
    }
}

// 리듀서
export default function accounts(state=initialState, action) {
    switch(action.type) {
        case LOGIN_ACCOUNT:
            return {
                ...state,
                login: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case LOGIN_ACCOUNT_SUCCESS:
            return {
                ...state,
                login: {
                    loading: false,
                    data: action.payload,
                    error: null
                }
            } 
        case LOGIN_ACCOUNT_ERROR:
            return {
                ...state,
                login: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            }
            case LOGOUT_ACCOUNT:
                return {
                    ...state,
                    login: {
                        loading: true,
                        data: null,
                        error: null
                    }
                };
            case LOGOUT_ACCOUNT_SUCCESS:
                return {
                    ...state,
                    login: {
                        loading: false,
                        data: action.payload,
                        error: null
                    }
                } 
            case LOGOUT_ACCOUNT_ERROR:
                return {
                    ...state,
                    login: {
                        loading: false,
                        data: null,
                        error: action.error
                    }
                }
        default:
            return state;
    }
}
