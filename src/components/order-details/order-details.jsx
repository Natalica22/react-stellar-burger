import doneImage from "../../images/done.svg";
import { orderPropTypes } from "../../utils/prop-types";
import styles from "./order-details.module.css";

export default function OrderDetails({ orderData }) {

  return (
    <>
      <h2 className={`text text_type_digits-large pt-4 pb-8 ${styles.order_number}`}>{orderData._id}</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImage} alt="оформлено" className="pt-15 pb-15"/>
      <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-30">Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

OrderDetails.propTypes = {
  orderData: orderPropTypes.isRequired
}