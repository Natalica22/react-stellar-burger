import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data, order, orderBun } from "../../utils/data";
import styles from "./burger-constructor.module.css";


export default function BurgerConstructor() {
  const bun = data.find(e => e._id === orderBun);
  const ingredients = order.map(e => data.find(elem => elem._id === e));

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
          {ingredients.map((e, i) =>
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
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

