// reducer state
export const initialState = () => ({
  isLoading: false,
  data: null,
  error: null,
});
export const loadingState = previousState => ({
  isLoading: true,
  data: previousState,
  error: null,
});
export const errorState = error => ({
  isLoading: false,
  data: null,
  error,
});

// create thunk action creator
export const createThunkActionCreator = (
  actionType = {},
  api,
  param = []
) => async dispatch => {
  const { loading, type, error } = actionType;
  dispatch({ type: loading });

  try {
    const payload = await api(...param);

    dispatch({ type, payload });
  } catch (e) {
    dispatch({ type: error, payload: e });
  }
};