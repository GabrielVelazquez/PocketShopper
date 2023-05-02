const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PROFILE_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
      case PROFILE_SAVE_SUCCESS:
        return INITIAL_STATE;
      default:
        return state;
    }
  };