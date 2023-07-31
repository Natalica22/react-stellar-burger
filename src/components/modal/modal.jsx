import * as ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { useEffect } from 'react';

const modalsContainer = document.querySelector("#modals-container");

export default function Modal({ title, children, handleCloseClick }) {

  const closeOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      handleCloseClick();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    }
  }, []);

  return ReactDOM.createPortal (
    (
    <>
      <ModalOverlay handleCloseClick={handleCloseClick}/>
      <div className={styles.modal}>
        <div className={`${styles.title_container} pl-10 pt-10 pr-10`}>
          <h2 className="text text_type_main-large">{ title }</h2>
          <button className={styles.close} onClick={handleCloseClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{ children }</div>
      </div>
    </>),
    modalsContainer
  );
}