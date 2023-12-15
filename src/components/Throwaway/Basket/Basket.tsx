import { GiFruitBowl } from "react-icons/gi";
import styles from "./Basket.module.css";

function BasketHover() {
  return (
    <div className="d-flex justify-content-center mt-2">
      <GiFruitBowl size={75} className={styles.hollowIcon}></GiFruitBowl>
    </div>
  );
}
export default BasketHover;
