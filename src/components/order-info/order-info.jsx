import { useParams } from "react-router-dom";
import styles from "./order-info.module.css";

export function OrderInfo({ modal }) {
  const params = useParams();

  return (
    <div>{params.id}</div>
  );
}