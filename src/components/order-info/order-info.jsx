import { useParams } from "react-router-dom";
import styles from "./order-info.module.css";
import { STATUS_DONE, getStatusText } from "../../utils/order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { wsConnectActionPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { disconnect } from "../../services/actions/wsFeedOrders";

export function OrderInfo({ wsConnectAction, modal }) {
  const params = useParams();
  const dispatch = useDispatch();

  const getOrdersData = store => store.wsFeedOrders.data;
  const ordersData = useSelector(getOrdersData);

  const orders = useMemo(() => 
    ordersData ? ordersData.orders.toReversed() : [],
    [ordersData]);

  const getIngredients = store => store.burgerIngredients.ingredients;
  const ingredients = useSelector(getIngredients);

  const order = useMemo(() => orders.find(e => e._id === params.id), [orders, params]);

  const orderIngredients = useMemo(() => order ? order.ingredients
    .map(e => ingredients.find(i => e === i._id))
    .filter(e => e !== undefined) : [], [order, ingredients]);

  const price = orderIngredients.reduce((result, e) => e.price + result, 0);

  const uniqueIngredients = orderIngredients.reduce((result, e) => {
    const ingredient = result.find(elem => elem._id === e._id);
    if (ingredient) {
      ingredient.count += 1;
      return result;
    } else {
      const newIngredient = { ...e, count: 1 };
      return [...result, newIngredient];
    }
  }, []);

  const status = useMemo(() => order && getStatusText(order.status), [order]);

  useEffect(() => {
    if (!modal) {
      dispatch(wsConnectAction);
      return () => dispatch(disconnect());
    }
  }, [dispatch, wsConnectAction, modal]);

  return (
    order &&
    <div className={styles.order}>
      <div className={modal ? styles.container_modal : styles.container}>
        <p className={`text text_type_digits-default ${modal ? styles.number_modal : styles.number}`}>#{order.number}</p>
        <h2 className="text text_type_main-medium pt-5 pb-2">{order.name}</h2>
        {status &&
          <p className={`text text_type_main-default ${order.status === STATUS_DONE ? styles.status_done : ''}`}>{status}</p>
        }
        <p className="text text_type_main-medium pt-15 pb-6">Состав:</p>
        <ul className={`${styles.list} custom-scroll`}>
          {uniqueIngredients.map(e =>
            <li className={styles.details} key={e._id}>
              <div className={styles.ingredient}>
                <div className={styles.image_wrapper}>
                  <img src={e.image_mobile} alt={e.name} className={styles.image} />
                </div>
                <p className={`text text_type_main-default ${styles.name}`}>{e.name}</p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default">{e.count} x {e.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          )}
        </ul>
        <div className={styles.info}>
          <FormattedDate date={new Date(order.createdAt)}
            className="text text_type_main-default text_color_inactive" />
          <div className={styles.price}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

OrderInfo.propTypes = {
  wsConnectAction: wsConnectActionPropType.isRequired,
  modal: PropTypes.bool
}