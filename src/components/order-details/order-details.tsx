import { useSelector } from "react-redux";
import doneImage from "../../images/done.svg";
import styles from "./order-details.module.css";
import { RootState } from "../../utils/types";

export default function OrderDetails() {
  const getOrderState = (store: RootState) => store.order;

  const orderState = useSelector(getOrderState);

  return (
    !orderState.created ? null :
    <div className={styles.container}>
      {
        orderState.order ? 
        <h2 className={`text text_type_digits-large pt-20 pb-8 ${styles.order_number}`}>{orderState.order.number}</h2> :
        <h2 className={`text text_type_main-large pt-20 pb-8 ${styles.order_number}`}>Оформление заказа...</h2>
      }
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={doneImage} alt="оформлено" className="pt-15 pb-15"/>
      <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-20">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}