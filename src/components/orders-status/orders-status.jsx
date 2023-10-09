import styles from "./orders-status.module.css";

export function OrdersStatus() {
  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        <div>
          <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
          <ul className={`${styles.orders_numbers} ${styles.done_orders}`}>
            <li className="text text_type_digits-default">234565</li>
            <li className="text text_type_digits-default">345366</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
            <li className="text text_type_digits-default">456467</li>
          </ul>
        </div>
        <div>
          <h3 className="text text_type_main-medium pb-6">В работе:</h3>
          <ul className={styles.orders_numbers}>
            <li className="text text_type_digits-default">435633</li>
            <li className="text text_type_digits-default">464754</li>
            <li className="text text_type_digits-default">567563</li>
            <li className="text text_type_digits-default">435633</li>
            <li className="text text_type_digits-default">464754</li>
            <li className="text text_type_digits-default">567563</li>
            <li className="text text_type_digits-default">435633</li>
            <li className="text text_type_digits-default">464754</li>
            <li className="text text_type_digits-default">567563</li>
            <li className="text text_type_digits-default">435633</li>
            <li className="text text_type_digits-default">464754</li>
            <li className="text text_type_digits-default">567563</li>
            <li className="text text_type_digits-default">435633</li>
            <li className="text text_type_digits-default">464754</li>
            <li className="text text_type_digits-default">567563</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.number_glow}`}>28752</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.number_glow}`}>138</p>
      </div>
    </div>
  );
}