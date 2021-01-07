// thunk 생성 함수 리팩토링
export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCESS, ERROR]= [`${type}_SUCCESS`, `${type}_ERROR`];

    const thunkCreator= param => async (dispatch, getState) => {
        // 요청시작
        dispatch({ type });
        try {
            // API 호출
            const payload = await promiseCreator(param);
            // 성공했을 때
            dispatch({ 
                type: SUCESS,
                payload
            });
        } catch (e) {
            // 실패했을 때
            dispatch({
                type: ERROR,
                payload: e,
                error: true // FSA(Flux Standard Action) 규칙
            });
        }

    }

    return thunkCreator;
}

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    const reducer = (state, action) => {
        switch(action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading()
                }
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                }
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                }
            default:
                return state;
        }
    }
    return reducer;
}



// 초기값 리팩토링
export const reducerUtils = {
    initial: (initialData=null)=>({
        loading: false,
        data: initialData,
        error: null
    }),
    loading: (prevState=null)=>({
        data:prevState,
        loading: true,
        error: null
    }),
    success: (data) =>({
        data,
        loading: false,
        error: null
    }),
    error: (error) => ({
        data: null,
        loading: false,
        error
    })
}