import React, { useReducer } from 'react';

export const alertCase = {
  loading: 'ALERT_LOADING',
  error: 'ALERT_ERROR',
  success: 'ALERT_SUCCESS',
  reset: 'ALERT_RESET',
};

export const initialAlertState = {
  isLoading: false,
  errorMessage: '',
  successMessage: '',
};

export const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case alertCase.loading:
      return {
        ...state,
        isLoading: true,
      };
    case alertCase.error:
      return {
        ...state,
        isLoading: false,
        successMessage: '',
        errorMessage: payload,
      };
    case alertCase.success:
      return {
        ...state,
        isLoading: false,
        successMessage: payload,
        errorMessage: '',
      };
    case alertCase.reset:
      return {
        ...initialAlertState,
      };
    default:
      return state;
  }
};

export const useAlert = () => {
  const [alertState, dispatchAlert] = useReducer(
    alertReducer,
    initialAlertState
  );

  return { alertState, dispatchAlert };
};

export default useAlert;
