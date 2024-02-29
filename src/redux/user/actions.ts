import { User } from 'firebase/auth';
import { createAsyncAction } from 'typesafe-actions';

export enum UserActions {
  LOGIN_USER_REQUEST = '@user/LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = '@user/LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = '@user/LOGIN_USER_FAILURE',

  LOGOUT_USER_REQUEST = '@user/LOGOUT_USER_REQUEST',
  LOGOUT_USER_SUCCESS = '@user/LOGOUT_USER_SUCCESS',
  LOGOUT_USER_FAILURE = '@user/LOGOUT_USER_FAILURE',
}

export const loginUserAsyncAction = createAsyncAction(
  UserActions.LOGIN_USER_REQUEST,
  UserActions.LOGIN_USER_SUCCESS,
  UserActions.LOGIN_USER_FAILURE,
)<undefined, { currentUser: User }, { error: string }>();

export const logoutUserAsyncAction = createAsyncAction(
  UserActions.LOGOUT_USER_REQUEST,
  UserActions.LOGOUT_USER_SUCCESS,
  UserActions.LOGOUT_USER_FAILURE,
)<undefined, undefined, { error: string }>();
