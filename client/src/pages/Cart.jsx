import React, {useEffect, useState} from 'react';
import styles from './Cart.module.css';
import axios from '../axios';
import ItemsInCart from "../components/ItemsInCart";
import {Link} from "react-router-dom";
import AddToCartNotification from "../components/AddToCartNotification";

const Cart = () => {
    const [showNotification, setShowNotification] = React.useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`/cart/${userId}`);
                setCartItems(response.data.items);
                setIsLoading(false)
                console.log(cartItems)
            } catch (error) {
                console.log(error.response.data);
            }
        };

        if (userId) {
            fetchCartItems();
        }
    }, []);

    const createOrder = async () => {
        const userId = localStorage.getItem('userId');
        const cartItems = await axios.get(`/cart/${userId}`);

        const orderItems = cartItems.data.items.map(item => ({
            item: item.item._id,
            quantity: item.quantity
        }));

        const total = cartItems.data.items.reduce((acc, item) => acc + item.item.cost * item.quantity, 0);

        const orderData = {
            user: userId,
            items: orderItems,
            total: total
        };

        await axios.post('/orders', orderData).then(res => {
            console.log(res)
            clearCart()
        });

        setShowNotification(true)
        setTimeout(() => {
            setShowNotification(false)
        }, 1000);
    };


    const clearCart = async () => {
        const userId = localStorage.getItem('userId');
        await axios.delete(`/clearCart/${userId}`);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1>Корзина</h1>
            </div>
            {
                (isLoading ? [...Array(6)] : cartItems).map((item) =>
                    item && (<ItemsInCart key={item._id} title={item.item.title} cost={item.item.cost}
                                  imageUrl={item.item.imageUrl} id={item.item._id} quantity={item.quantity}/>)
                )
            }
            <div className={styles.order_btn}>
                <button className={styles.button} onClick={createOrder}>
                    Сделать заказ
                </button>
                <Link to={'myOrders'}>
                    <button className={styles.button}>
                        Мои заказы
                    </button>
                </Link>
            </div>
            {showNotification && <AddToCartNotification show={showNotification} text={"Заказ создан!"}/>}
        </div>
    );
};

export default Cart;
