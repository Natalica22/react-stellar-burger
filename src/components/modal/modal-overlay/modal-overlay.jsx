import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ handleCloseClick }) {
  
  return (
    <div className={styles.overlay} onClick={handleCloseClick}></div>
  );
}