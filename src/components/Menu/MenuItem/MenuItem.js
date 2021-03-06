import MenuItemForm from "./MenuItemForm";
import styles from "./MenuItem.module.css";
import { useContext } from "react";

import CartContext from "../../../store/cart-context";
import AuthContext from "../../../store/auth-context";

const MenuItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const imageUrl = `http://localhost:8080/${props.imageUrl}`;
  const addToCartHandler = (amount) => {
    if (cartCtx.shopId !== props.shopId) {
      cartCtx.clearCart();
    }
    cartCtx.addItem(
      {
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
        shopId: props.shopId,
      },
      token
    );
  };

  return (
    <li className={styles.menu}>
      <div className={styles["menu-info"]}>
        <div className={styles["image-container"]}>
          <img src={imageUrl} />
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>{props.price}원</div>
        </div>
      </div>
      <div className={styles["menu-form"]}>
        <MenuItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MenuItem;
