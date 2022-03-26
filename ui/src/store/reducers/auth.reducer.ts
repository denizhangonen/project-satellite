import * as ACTION_TYPES from '../actions/actionTypes/auth-types';
import IAuth from '../../Shared/Models/Auth/IAuth';

interface IAction {
  type: string;
  payload: any;
}

interface IAuthReducerState {
  auth: IAuth | null;
}

const initialState: IAuthReducerState = {
  auth: null,
};

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_START:
      return {
        ...state,
      };
    case ACTION_TYPES.AUTH_SUCCESS:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTION_TYPES.AUTH_FAIL:
      return {
        ...state,
        auth: null,
      };
    case ACTION_TYPES.AUTH_LOGOUT:
      return {
        ...state,
        auth: null,
      };
    default:
      return state;
  }
};

export default authReducer;
