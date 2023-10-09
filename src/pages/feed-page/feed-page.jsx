import { OrdersList } from "../../components/orders-list/orders-list";
import styles from "./feed-page.module.css";
import { orders } from "../../utils/constants";

export function FeedPage() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className="text text_type_main-large pt-10 pl-1">Лента заказов</h2>
        <div className={styles.orders}>
          <OrdersList className={`${styles.list} pl-1`} orders={orders} showStatus={false}/>
          <div>
            <div>
              <div>
                <h3>Готовы:</h3>
                <ul>
                  <li>234565</li>
                  <li>345366</li>
                  <li>456467</li>
                </ul>
              </div>
              <div>
                <h3>В работе:</h3>
                <ul>
                  <li>435633</li>
                  <li>464754</li>
                  <li>567563</li>
                </ul>
              </div>
            </div>
            <div>
              <h3>Выполнено за все время:</h3>
              <p>28752</p>
            </div>
            <div>
              <h3>Выполнено за сегодня:</h3>
              <p>138</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}