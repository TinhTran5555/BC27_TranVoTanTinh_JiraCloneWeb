import { useEffect } from 'react';
import { useReducer } from 'react';

const requestCase = {
  pending: 'PENDING',
  fulfilled: 'FULFILLED',
  rejected: 'REJECTED',
  finally: 'FINALLY',
};

const initialState = {
  isLoading: false,
  data: null,
  error: '',
};

const requestReducer = (state, { type, payload }) => {
  switch (type) {
    case requestCase.pending:
      return {
        ...state,
        isLoading: true,
      };
    case requestCase.fulfilled:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case requestCase.rejected:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case requestCase.finally:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const useRequest = (fn, config = {}) => {
  const [state, dispatch] = useReducer(requestReducer, initialState);
  const { isManual = false, deps = [] } = config;

  const request = async (params) => {
    try {
      dispatch({ type: requestCase.pending });
      const data = await fn(params);
      return data;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: requestCase.finally });
    }
  };

  useEffect(() => {
    if (!isManual) {
      request()
        .then((data) =>
          dispatch({ type: requestCase.fulfilled, payload: data })
        )
        .catch((error) =>
          dispatch({ type: requestCase.rejected, payload: error })
        );
    }
  }, deps);

  const result = isManual ? request : state.data;

  return { ...state, data: result };
};
