import { User } from 'firebase/auth';
import { getType } from 'typesafe-actions';
import { GlobalAppActions } from '../actions';
import { loginUserAsyncAction, logoutUserAsyncAction } from './actions';
import { RequestState } from '../../services/commonTypes';

export interface UserState {
  currentUser: User | null;
  loginUserRequestState: RequestState;
  loginUserError: string | null;
  logoutUserRequestState: RequestState;
  logoutUserError: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loginUserRequestState: RequestState.Unset,
  loginUserError: null,
  logoutUserRequestState: RequestState.Unset,
  logoutUserError: null,
};

export const reducer = (
  state = initialState,
  action: GlobalAppActions,
): UserState => {
  switch (action.type) {
    case getType(loginUserAsyncAction.request): {
      return {
        ...state,
        loginUserRequestState: RequestState.Waiting,
        loginUserError: null,
      };
    }

    case getType(loginUserAsyncAction.success): {
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loginUserRequestState: RequestState.Success,
        loginUserError: null,
      };
    }

    case getType(loginUserAsyncAction.failure): {
      return {
        ...state,
        loginUserRequestState: RequestState.Failure,
        loginUserError: action.payload.error,
      };
    }

    case getType(logoutUserAsyncAction.request): {
      return {
        ...state,
        logoutUserRequestState: RequestState.Waiting,
        logoutUserError: null,
      };
    }

    case getType(logoutUserAsyncAction.success): {
      return {
        ...state,
        currentUser: null,
        logoutUserRequestState: RequestState.Success,
        logoutUserError: null,
      };
    }

    case getType(logoutUserAsyncAction.failure): {
      return {
        ...state,
        logoutUserRequestState: RequestState.Failure,
        logoutUserError: action.payload.error,
      };
    }

    default:
      return state;
  }
};
