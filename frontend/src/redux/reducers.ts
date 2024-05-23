import { ANIM_STATE_VAL, GENERATE_VAL, SET_USERS_RANKING, SET_USER_NAME, SPEED_STATE_VAL, UPDATE_BALANCE_VAL } from "./actions";

const initialState = {
    userName: '',
    balance: 1000,
    generatedValue: 0,
    speed: 0,
    animShow: false,
    usersRanking: [],
};

  
const reduxReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_NAME:
        return {
          ...state,
          userName: action.payload,
        };
      case GENERATE_VAL:
        return {
          ...state,
          animShow: true,
          generatedValue: action.payload,
        };
      case SPEED_STATE_VAL:
        return {
          ...state,
          speed: action.payload,
        };
      case ANIM_STATE_VAL:
        return {
          ...state,
          animShow: action.payload,
        };
      case UPDATE_BALANCE_VAL:
        return {
          ...state,
          balance: action.payload,
        };
      case SET_USERS_RANKING:
        return {
          ...state,
          usersRanking: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reduxReducer;