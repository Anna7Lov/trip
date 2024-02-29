import React from 'react';
import styles from './Loading.module.scss';

export const Loading = (): JSX.Element => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
    </div>
  );
};
