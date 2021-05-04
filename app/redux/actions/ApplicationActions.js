export const SET_RENDER = 'SET_RENDER';

export function setRender(renderState) {
  return (dispatch) => {
    dispatch({
      type: SET_RENDER,
      data: renderState,
    });
  };
}
