import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import cartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHiglighted] =useState(false);

  const cartCtx = useContext(cartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ?  classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0){
      return;
    }
    setBtnIsHiglighted(true);

    const timer = setTimeout(() => {
      setBtnIsHiglighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;

