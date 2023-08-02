import styles from "./header-link.module.css";
import PropTypes from "prop-types";

export default function HeaderLink({ extraClass, children }) {

  return (
    <a href="#" className={`text text_type_main-default ${styles.link} pt-4 pb-4 pl-5 pr-5 ${extraClass}`}>
      {children}
    </a>
  );
}

HeaderLink.propTypes = {
  extraClass: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.string])).isRequired
}