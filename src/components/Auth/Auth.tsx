import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Error } from '../Error/Error';
import {
  selectUser,
  selectIsUserLoading,
  selectisUserFailed,
  selectIsUserLogoutLoading,
  selectisUserLogoutFailed,
} from '../../redux/user/selectors';
import { loginUserThunk, logoutUserThunk } from '../../redux/user/thunks';
import styles from './Auth.module.scss';

export const Auth = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectIsUserLoading);
  const userError = useSelector(selectisUserFailed);
  const isUserLogoutLoading = useSelector(selectIsUserLogoutLoading);
  const userLogoutError = useSelector(selectisUserLogoutFailed);

  const handleGoogleLogin = useCallback(() => {
    dispatch(loginUserThunk());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUserThunk());
  }, [dispatch]);

  return (
    <div className={styles.auth}>
      {user === null && !userError && !isUserLoading && (
        <button
          className={styles.auth__loginButton}
          onClick={handleGoogleLogin}
          type="submit"
        >
          Login with Google
        </button>
      )}
      {isUserLoading && (
        <p className={styles.auth__waiting}>Waiting for your login...</p>
      )}
      {isUserLogoutLoading && (
        <p className={styles.auth__waiting}>Waiting for logout...</p>
      )}
      {user !== null && user.email && !userLogoutError && (
        <div className={styles.auth__user}>
          <span>
            {user.email.length < 25
              ? user.email
              : `${user.email.substring(0, 22)}...`}
          </span>
          <div className={styles.auth__userSections}>
            <Link to={'/profile'} className={styles.auth__profileLink}>
              Profile
            </Link>
            <button
              type="button"
              className={styles.auth__logoutButton}
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      )}
      {userLogoutError && <Error title={userLogoutError} />}
      {!user && !isUserLoading && userError && (
        <Error title={userError ?? 'Something went wrong'} />
      )}
    </div>
  );
};
