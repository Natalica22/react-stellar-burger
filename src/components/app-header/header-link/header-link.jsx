import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header-link.module.css";
import PropTypes from "prop-types";

export default function HeaderLink({ extraClass, children }) {

  return (
    <Button htmlType="button" type="secondary" size="large" extraClass={`text text_type_main-default ${styles.link} pt-4 pb-4 pl-5 pr-5 ${extraClass}`}>
      {children}
    </Button>
  );
}

HeaderLink.propTypes = {
  extraClass: PropTypes.string
}