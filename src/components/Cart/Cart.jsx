import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import CurrencyContext from "../Cart/CurrencyContext";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);
  const [currency, setCurrency] = useState("USD");

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <CurrencyContext.Provider value={currency}>
      <section className={styles.cart}>
        <h2 className={styles.title}>Your cart</h2>
        <div className={styles.currency} id="currency__block">
          <label htmlFor="currency">Choose currency:</label>
          <select id="currency" value={currency} onChange={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="UAH">UAH</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
  
        {!cart.length ? (
          <div className={styles.empty}>Here is empty</div>
        ) : (
          <>
            <div className={styles.list}>
              {cart.map((item) => {
                const { title, category, images, price, id, quantity } = item;
                let convertedPrice = price;
                switch (currency) {
                  case "UAH":
                    convertedPrice *= 37;
                    break;
                  case "EUR":
                    convertedPrice *= 0.9;
                    break;
                  default:
                    break;
                }
  
                return (
                  <div className={styles.item} key={id}>
                    <div
                      className={styles.image}
                      style={{ backgroundImage: `url(${images[0]})` }}
                    />
                    <div className={styles.info}>
                      <h3 className={styles.name}>{title}</h3>
                      <div className={styles.category}>{category.name}</div>
                    </div>
  
                    <div className={styles.price}>
                      {convertedPrice.toFixed(2)}
                      {currency}
                    </div>
  
                    <div className={styles.quantity}>
                      <div
                        className={styles.minus}
                        onClick={() =>
                          changeQuantity(item, Math.max(1, quantity - 1))
                        }
                      >
                        <svg className="icon">
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                          />
                        </svg>
                      </div>
  
                      <span>{quantity}</span>
  
                      <div
                        className={styles.plus}
                        onClick={() =>
                          changeQuantity(item, Math.max(1, quantity + 1))
                        }
                      >
                        <svg className="icon">
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                          />
                        </svg>
                      </div>
                    </div>
  
                    <div className={styles.total}>
                      {(convertedPrice * quantity).toFixed(2)}
                      {currency}
                    </div>
  
                    <div
                      className={styles.close}
                      onClick={() => removeItem(item.id)}
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{" "}
              <span>
                {sumBy(cart.map(({ quantity, price }) => quantity * price))}$
              </span>
            </div>

            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
    </CurrencyContext.Provider>
  );
};

export default Cart;
