import styles from "./modal-overlay.module.css";

type Props = {
  handleCloseClick: () => void;
}

export default function ModalOverlay({ handleCloseClick }: Props) {
  
  return (
    <div className={styles.overlay} onClick={handleCloseClick}></div>
  );
}