const SELECTED_SET = 'SELECTED_SET';

export const setSelected = id => ({ type: SELECTED_SET, id });

const initialState = '';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED_SET:
      return action.id;

    default:
      return state;
  }
}
