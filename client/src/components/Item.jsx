import React from 'react';
import styles from './Item.module.css';
import axios from "../axios";
import AddToCartNotification from "./AddToCartNotification";

const Item = ({title, cost, imageUrl, description, id, category, isItemLoading}) => {
    const [showNotification, setShowNotification] = React.useState(false);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('/cart/addItem', { itemId: id });
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 1000);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            {
                isItemLoading ? <h1></h1>
                    :
                    <div className={styles.container}>
                        <div className={styles.image}>
                            <img src={imageUrl} alt="" />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>
                                <span>{title}</span>
                            </div>
                            <div className={styles.description}>
                                <span>{description}</span>
                            </div>
                            <div className={styles.price}>
                                <span>{cost} &#8381;</span>
                            </div>
                            <button className={styles.button} onClick={handleAddToCart}>Добавить в корзину</button>
                            {showNotification && <AddToCartNotification show={showNotification} text={"Товар успешно добавлен в корзину!"}/>}
                        </div>
                    </div>
            }
        </>
    )
};

export default Item;