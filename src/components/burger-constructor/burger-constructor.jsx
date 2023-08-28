import { useMemo } from "react";
import { useDrop } from 'react-dnd';
import { 
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT, CLOSE_ORDER_MODAL, DELETE_INGREDIENT, sendOrder } from "../../services/actions/cart";

export default function BurgerConstructor() {
  const dispatch = useDispatch();

  const { cart } = useSelector(store => store);
  const modalVisible = cart.order;

  const total = useMemo(() => cart.ingredients.reduce((result, e) => e.price + result, cart.bun ? cart.bun.price * 2 : 0), [cart]);

  const canOrder = useMemo(() => cart.bun && cart.ingredients.length > 0, [cart]);

  const submitOrder = () => {
    dispatch(sendOrder([cart.bun, ...cart.ingredients].map(e => e._id)));
  }

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  }

  const deleteIngredient = (i) => {
    dispatch({ type: DELETE_INGREDIENT, index: i });
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch({ type: ADD_INGREDIENT, ingredient: ingredient });
    },
  });

  return (
    <section className={`${styles.burger} pt-25 pb-13 pl-4`} ref={dropTarget}>
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
                handleClose={() => deleteIngredient(i)}
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
          <OrderDetails />
        </Modal>
      }
    </section>
  );
}