import { SET_RENDER } from '../actions/ApplicationActions';

const initialState = {
  render: true,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RENDER: {
      return {
        ...state,
        render: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default applicationReducer;
