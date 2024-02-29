import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';

interface SearchProps {
  applyQuery: (appliedQuery: string) => void;
}

export const Search = ({ applyQuery }: SearchProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: event.target.value });
    applyQuery(event.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        value={query}
        placeholder="Search your trip"
        type="search"
        className={styles.search__input}
        onChange={onInputChange}
      />
    </div>
  );
};
