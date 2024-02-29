import styles from './AddButton.module.scss';

interface AddButtonProps {
  onAddClicked: () => void;
}

export const AddButton = ({ onAddClicked }: AddButtonProps): JSX.Element => {
  return (
    <button type="button" onClick={onAddClicked} className={styles.button}>
      <span className={styles.button__addItem}>Add trip</span>
    </button>
  );
};
