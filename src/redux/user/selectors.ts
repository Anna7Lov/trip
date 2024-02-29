import { User } from 'firebase/auth';
import { GlobalAppState } from '../rootReducer';
import { RequestState } from '../../services/commonTypes';

export const selectUser = (state: GlobalAppState): User | null =>
  state.user.currentUser;

export const selectIsUserLoading = (state: GlobalAppState): boolean =>
  state.user.loginUserRequestState === RequestState.Waiting;

export const selectisUserFailed = (state: GlobalAppState): string | null =>
  state.user.loginUserError;

export const selectIsUserLogoutLoading = (state: GlobalAppState): boolean =>
  state.user.logoutUserRequestState === RequestState.Waiting;

export const selectisUserLogoutFailed = (
  state: GlobalAppState,
): string | null => state.user.logoutUserError;
