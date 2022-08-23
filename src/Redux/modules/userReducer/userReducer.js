const INITIAL_STATE_VALUE = {
  email: 'email@mail.com',
};

function userReducer(state = INITIAL_STATE_VALUE, action) {
  switch (action.type) {
  case 'SET_USER':
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default userReducer;
