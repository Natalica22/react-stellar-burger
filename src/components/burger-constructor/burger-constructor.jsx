import React, { useMemo } from "react";

import { 
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { OrderContext } from "../../services/order-context";
import { createOrder } from "../../utils/api";

export default function BurgerConstructor() {
  const { order } = React.useContext(OrderContext);

  const [orderDetails, setOrderDetails] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const bun = useMemo(() => order.bun, [order]);
  const orderIngredients = useMemo(() => order.ingredients, [order]);

  const total = useMemo(() => order.ingredients.reduce((result, e) => e.price + result, bun ? bun.price * 2 : 0), [order]);

  const canOrder = useMemo(() => order.bun && order.ingredients.length > 0, [order]);

  const submitOrder = () => {
    createOrder([bun, ...orderIngredients].map(e => e._id))
      .then(createdOrder => {
        setOrderDetails(createdOrder.order);
        setModalVisible(true);
      });
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <section className={`${styles.burger} pt-25 pb-13 pl-4`}>
      <div className={styles.ingredients}>
        {
          bun &&
          <ConstructorElement
            type="top"
            isLocked
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${styles.ingredient} ml-8`}
          />
        }
        <div className={`${styles.group} custom-scroll`}>
          {orderIngredients.map((e, i) =>
            <div className={styles.dragable_ingredient} key={i}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={e.name}
                price={e.price}
                thumbnail={e.image}
                extraClass={styles.ingredient}
              />
            </div>)}
        </div>
        {
          bun &&
          <ConstructorElement
            type="bottom"
            isLocked
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${styles.ingredient} ml-8`}
          />
        }
      </div>
      <div className={`${styles.container} pt-10`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" extraClass={styles.icon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitOrder} disabled={!canOrder}>
          Оформить заказ
        </Button>
      </div>
      {
        modalVisible && 
        <Modal handleCloseClick={closeModal}>
          <OrderDetails orderData={orderDetails} />
        </Modal>
      }
    </section>
  );
}