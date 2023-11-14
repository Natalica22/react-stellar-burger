import * as ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { ReactNode, useEffect } from 'react';

const modalsContainer = document.querySelector("#modals-container");

type Props = {
  children: ReactNode;
  handleCloseClick: () => void;
}

export default function Modal({ children, handleCloseClick }: Props) {

  useEffect(() => {
    const closeOnEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseClick();
      }
    }

    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    }
  }, [handleCloseClick]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay handleCloseClick={handleCloseClick} />
        <div className={styles.modal}>
          <button className={styles.close} onClick={handleCloseClick}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </>),
    modalsContainer as Element
  );
}