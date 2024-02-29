import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import styles from './ProfilePage.module.scss';

export const ProfilePage = (): JSX.Element => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.profile}>
      {user ? (
        <>
          <span>{user.displayName}</span>
          <span>{user.email}</span>
        </>
      ) : null}
    </div>
  );
};
