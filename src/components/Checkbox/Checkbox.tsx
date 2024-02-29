import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  id: string;
  isChecked: boolean;
  handleChange: () => void;
}

export const Checkbox = ({
  label,
  id,
  isChecked,
  handleChange,
}: CheckboxProps): JSX.Element => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox__input}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id} className={styles.checkbox__label}>
        {label}
      </label>
    </div>
  );
};
