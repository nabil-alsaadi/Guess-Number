
export const SET_USER_NAME = 'reduxStore/setUserName';
export const GENERATE_VAL = 'reduxStore/generateVal';
export const SPEED_STATE_VAL = 'reduxStore/speedStateVal';
export const ANIM_STATE_VAL = 'reduxStore/animStateVal';
export const UPDATE_BALANCE_VAL = 'reduxStore/updateBalanceVal';
export const SET_USERS_RANKING = 'reduxStore/setUsersRanking';


export const setUserName = (userName) => ({
  type: SET_USER_NAME,
  payload: userName,
});

export const generateVal = (generatedValue) => ({
  type: GENERATE_VAL,
  payload: generatedValue,
});

export const speedStateVal = (speed) => ({
  type: SPEED_STATE_VAL,
  payload: speed,
});

export const animStateVal = (animShow) => ({
  type: ANIM_STATE_VAL,
  payload: animShow,
});

export const updateBalanceVal = (balance) => ({
  type: UPDATE_BALANCE_VAL,
  payload: balance,
});

export const setUsersRanking = (usersRanking) => ({
  type: SET_USERS_RANKING,
  payload: usersRanking,
});