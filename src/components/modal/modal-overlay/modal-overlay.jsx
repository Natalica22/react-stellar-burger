import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ handleCloseClick }) {
  
  return (
    <div className={styles.overlay} onClick={handleCloseClick}></div>
  );
}

ModalOverlay.propTypes = {
  handleCloseClick: PropTypes.func.isRequired
}