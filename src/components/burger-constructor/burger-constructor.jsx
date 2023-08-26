import React, { useMemo } from "react";

import { 
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { createOrder } from "../../utils/api";
import { useSelector } from "react-redux";

export default function BurgerConstructor() {
  const { cart } = useSelector(store => store);

  const [orderDetails, setOrderDetails] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const total = useMemo(() => cart.ingredients.reduce((result, e) => e.price + result, cart.bun ? cart.bun.price * 2 : 0), [cart]);

  const canOrder = useMemo(() => cart.bun && cart.ingredients.length > 0, [cart]);

  const submitOrder = () => {
    createOrder([cart.bun, ...cart.ingredients].map(e => e._id))
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
          cart.bun &&
          <ConstructorElement
            type="top"
            isLocked
            text={cart.bun.name + " (верх)"}
            price={cart.bun.price}
            thumbnail={cart.bun.image}
            extraClass={`${styles.ingredient} ml-8`}
          />
        }
        <div className={`${styles.group} custom-scroll`}>
          {cart.ingredients.map((e, i) =>
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
          cart.bun &&
          <ConstructorElement
            type="bottom"
            isLocked
            text={cart.bun.name + " (низ)"}
            price={cart.bun.price}
            thumbnail={cart.bun.image}
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