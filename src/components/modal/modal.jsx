import * as ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { useEffect } from 'react';
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals-container");

export default function Modal({ children, handleCloseClick }) {

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
    modalsContainer
  );
}

Modal.propTypes = {
  handleCloseClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}