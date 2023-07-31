import React from "react";

import { 
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { order, orderBun } from "../../utils/data";
import styles from "./burger-constructor.module.css";
import { ingredientArrayPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import doneImage from "../../images/done.svg";

export default function BurgerConstructor({ ingrediens }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const bun = ingrediens.find(e => e._id === orderBun);
  const orderIngrediens = order.map(e => ingrediens.find(elem => elem._id === e));

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
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" extraClass={styles.icon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
          Оформить заказ
        </Button>
      </div>
      {
        modalVisible && 
        <Modal handleCloseClick={closeModal}>
          <h2 className="text text_type_digits-large pt-4 pb-8">034536</h2>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <img src={doneImage} alt="оформлено" className="pt-15 pb-15"/>
          <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive pb-30">Дождитесь готовности на орбитальной станции</p>
        </Modal>
      }
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingrediens: ingredientArrayPropType
}