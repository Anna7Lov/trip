import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = (): JSX.Element => (
  <div className={styles.notFoundPage}>
    <p className={styles.notFoundPage__text}>Page not found</p>
    <span className={styles.notFoundPage__error}>404</span>
    <Link to="/" className={styles.notFoundPage__link}>
      Go home
    </Link>
  </div>
);
