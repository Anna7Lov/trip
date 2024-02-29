import React, { ReactNode, useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  onModalClose: () => void;
  isModalVisible: boolean;
  children: ReactNode;
}

export const Modal = ({
  title,
  children,
  onModalClose,
  isModalVisible,
}: ModalProps): JSX.Element => {
  const searchToolsRef = useRef(null);
  useOnClickOutside(searchToolsRef, onModalClose, isModalVisible);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__window} ref={searchToolsRef}>
        <div className={styles.modal__content}>
          <div className={styles.modal__header}>
            <h2 className={styles.modal__title}>{title}</h2>
            <button onClick={onModalClose} className={styles.modal__cross}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 17.643L27.0711 10.5719L29.4281 12.9289L22.357 20L29.4281 27.0711L27.0711 29.4281L20 22.357L12.9289 29.4281L10.5719 27.0711L17.643 20L10.5719 12.9289L12.9289 10.5719L20 17.643Z"
                  fill="gray"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
