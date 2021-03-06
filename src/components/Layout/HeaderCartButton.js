import { useContext, useEffect, useState } from "react";

// import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import CartIcon from "../../assets/shopping-cart.png";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnUpdated, setBtnUpdated] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnUpdated(true);

    const timer = setTimeout(() => {
      setBtnUpdated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      className={`${styles.button} ${btnUpdated ? styles.bump : ""} `}
      onClick={props.onClick}
    >
      <span>CART</span>
      <span className={styles.icon}>
        <img src={CartIcon}></img>
      </span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
