import styles from './Error.module.scss';

interface ErrorProps {
  title: string;
}

export const Error = ({ title }: ErrorProps): JSX.Element => {
  return <p className={styles.error}>{title}</p>;
};
