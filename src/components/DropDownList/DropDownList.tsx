import React, { useState, useRef, useCallback } from 'react';
import styles from './DropDownList.module.scss';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface Option {
  id: string;
  name: string;
  image: string;
  value: string;
}

interface DropDownListProps {
  items: Option[];
  value: string;
  handleSelectChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export const DropDownList = ({
  items,
  value,
  handleSelectChange,
  placeholder,
  label,
}: DropDownListProps): JSX.Element => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsListOpen(!isListOpen);
  };

  const handleItemClick = (item: Option) => {
    handleSelectChange(item.value);
    setIsListOpen(false);
  };

  const closeList = useCallback(() => {
    setIsListOpen(false);
  }, []);

  useOnClickOutside(dropdownRef, closeList, isListOpen);

  return (
    <div>
      <div className={styles.dropDownList} ref={dropdownRef}>
        {label && <label className={styles.dropDownList__label}>{label}</label>}
        <div className={styles.dropDownList__select} onClick={toggleDropdown}>
          {value !== ''
            ? items.find((item) => item.value === value)?.name
            : placeholder}
        </div>
        {isListOpen && (
          <ul className={styles.dropDownList__options}>
            {items.map((item) => (
              <li
                key={item.id}
                className={styles.dropDownList__option}
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.dropDownList__image}
                />
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
