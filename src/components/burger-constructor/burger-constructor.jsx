import React, { useMemo } from "react";

import { 
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { order, orderBun, orderData } from "../../utils/data";
import styles from "./burger-constructor.module.css";
import { ingredientArrayPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

export default function BurgerConstructor({ ingrediens }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const bun = useMemo(() => ingrediens.find(e => e._id === orderBun), [ingrediens]);
  const orderIngrediens = useMemo(() => order.map(e => ingrediens.find(elem => elem._id === e)), [ingrediens]);

  const total = useMemo(() => order.reduce((result, e) => ingrediens.find(elem => elem._id === e).price + result, bun.price * 2), [ingrediens]);

  const submitOrder = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <section className={`${styles.burger} pt-25 pb-13 pl-4`}>
      <div className={styles.ingredients}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredient} ml-8`}
        />
        <div className={`${styles.group} custom-scroll`}>
          {orderIngrediens.map((e, i) =>
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
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`${styles.ingredient} ml-8`}
        />
      </div>
      <div className={`${styles.container} pt-10`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" extraClass={styles.icon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
      {
        modalVisible && 
        <Modal handleCloseClick={closeModal}>
          <OrderDetails orderData={orderData} />
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingrediens: ingredientArrayPropType.isRequired
}