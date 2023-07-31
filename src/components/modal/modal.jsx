import * as ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalsContainer = document.querySelector("#modals-container");

export default function Modal({ title, children }) {

  return ReactDOM.createPortal (
    (
    <>
      <ModalOverlay />
      <div className={styles.modal}>
        <div className={`${styles.title_container} pl-10 pt-10 pr-10`}>
          <h2 className="text text_type_main-large">{ title }</h2>
          <button className={styles.close}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{ children }</div>
      </div>
    </>),
    modalsContainer
  );
}