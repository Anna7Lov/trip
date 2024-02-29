import { loginUserAsyncAction, logoutUserAsyncAction } from './actions';
import { AppDispatch } from '../index';
import { ThunkAction } from 'redux-thunk';
import { GlobalAppState } from '../rootReducer';
import { GlobalAppActions } from '../actions';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app, googleAuthProvider } from '../../firebase';

export type ThunkAppType = ThunkAction<
  Promise<void>,
  GlobalAppState,
  undefined,
  GlobalAppActions
>;
const auth = getAuth(app);

export const loginUserThunk =
  (): ThunkAppType => async (dispatch: AppDispatch) => {
    dispatch(loginUserAsyncAction.request());
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      dispatch(loginUserAsyncAction.success({ currentUser: response.user }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(loginUserAsyncAction.failure({ error: error.message }));
      }
    }
  };

export const logoutUserThunk =
  (): ThunkAppType => async (dispatch: AppDispatch) => {
    dispatch(logoutUserAsyncAction.request());
    try {
      await auth.signOut();
      dispatch(logoutUserAsyncAction.success());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(logoutUserAsyncAction.failure({ error: error.message }));
      }
    }
  };
