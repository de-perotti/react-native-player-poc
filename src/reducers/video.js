/* Actions */
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FINISH = 'REQUEST_FINISH';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ONGOING = 'REQUEST_ONGOING';

/* Action Creators */
export const actionCreators = name => ({
  start: { type: REQUEST_START, name },
  finish: { type: REQUEST_FINISH, name },
  fail: message => ({ type: REQUEST_FAIL, message, name }),
  success: response => ({ type: REQUEST_SUCCESS, name, ...response }),
  ongoing: { type: REQUEST_ONGOING, name },
});

const initialState = {};
const defaultObject = {
  started: false,
  finished: false,
  success: null,
  message: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        [action.name]: {
          ...defaultObject,
          started: true,
        },
      };

    case REQUEST_FINISH:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          finished: true,
        },
      };

    case REQUEST_FAIL:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          success: false,
          message: action.message,
        },
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          success: true,
          message: action.statusText,
        },
      };

    case REQUEST_ONGOING:
    default:
      return state;
  }
}
