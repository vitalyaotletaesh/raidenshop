import React from 'react';
import styles from './ItemsInCart.module.css'
import axios from "../axios";
import AddToCartNotification from "./AddToCartNotification";

const ItemsInCart = ({cost, title, imageUrl, id, quantity}) => {
    const [showNotification, setShowNotification] = React.useState(false);
    const itemId = id

    const removeItemFromCart = async () => {
        try {
            const response = await axios.delete(`/cart/item/${itemId}`);
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 1000);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.item}>
            <div className={styles.item_image}>
                <img src={imageUrl} alt="" width="300" height="300"/>
            </div>
            <div className={styles.item_name}>
                <span>{title}</span>
            </div>
            <div className={styles.item_price}>
                <span>{cost * quantity} &#8381;</span>
            </div>
            <div className={styles.item_price}>
                <span>Количество: {quantity}</span>
            </div>
            <button className={styles.button} onClick={removeItemFromCart}>Убрать</button>
            {showNotification && <AddToCartNotification show={showNotification} text={"Товар успешно удалён из корзины!"}/>}
        </div>
    );
};

export default ItemsInCart;