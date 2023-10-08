import { useCallback, useMemo } from "react";
import { useDrop } from 'react-dnd';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions/cart";
import DraggableConstructorElement from "./draggable-constructor-element/draggable-constructor-element";
import { v4 as uuidv4 } from 'uuid';
import { CLOSE_ORDER_MODAL, sendOrder } from "../../services/actions/order";
import { LOGIN_PAGE } from "../../utils/pages";
import { useNavigate } from "react-router-dom";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCart = store => store.cart;
  const cart = useSelector(getCart);

  const getOrder = store => store.order;
  const modalVisible = useSelector(getOrder);

  const total = useMemo(() => cart.ingredients.reduce((result, e) => e.price + result, cart.bun ? cart.bun.price * 2 : 0), [cart]);

  const canOrder = useMemo(() => cart.bun && cart.ingredients.length > 0, [cart]);

  const getUser = store => store.user.user;
  const user = useSelector(getUser);

  const submitOrder = () => {
    if (user){
      dispatch(sendOrder([cart.bun, ...cart.ingredients].map(e => e._id)));
    } else {
      navigate(LOGIN_PAGE);
    }
  }

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch({ type: ADD_INGREDIENT, ingredient: ingredient, uid: uuidv4() });
    },
  });

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    dispatch({ type: MOVE_INGREDIENT, fromIndex: dragIndex, toIndex: hoverIndex });
  }, [dispatch]);

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
            <DraggableConstructorElement key={e.uid} ingredient={e} index={i} moveElement={moveElement} />
          )}
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