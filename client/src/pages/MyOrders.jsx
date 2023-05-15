import React from 'react';
import axios from "../axios";
import styles from './MyOrders.module.css'

const MyOrders = () => {
    const [orders, setOrders] = React.useState()

    React.useEffect(() => {
        const userId = window.localStorage.getItem('userId')
        const getMyOrders = async () => {
            try {
                const response = await axios.get(`/api/orders/user/${userId}`);
                const orders = response.data;
                const items = await Promise.all(
                    orders.flatMap((order) => order.items.map((item) => item.item))
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .map((itemId) => axios.get(`/items/${itemId}`))
                );
                const itemsById = Object.fromEntries(items.map((item) => [item.data._id, item.data]));
                setOrders(orders.map((order) => ({
                    ...order,
                    items: order.items.map((item) => ({
                        ...item,
                        item: itemsById[item.item]
                    }))
                })));
            } catch (error) {
                console.error('Ошибка при получении заказов:', error);
            }
        }
        if (userId) {
            getMyOrders();
        }
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Мои заказы</h2>
            {orders && orders.length > 0 ? (
                <div className={styles.orderContainer}>
                    {orders.map((order) => (
                        <div key={order._id} className={styles.order}>
                            <div className={styles.orderHeader}>
                                <div className={styles.orderId}>Заказ #{order._id}</div>
                                <div className={styles.orderDate}>Дата заказа: {new Date(order.createdAt).toLocaleDateString()}</div>
                                <div className={styles.orderStatus} style={{ color: order.status === 'Открыт' ? 'green' : 'red' }}>Статус заказа: {order.status}</div>
                            </div>
                            <div className={styles.itemListContainer}>
                                <ul className={styles.itemList}>
                                    {order.items.map((item) => (
                                        <li key={item._id} className={styles.item}>
                                            <div className={styles.itemImageContainer}>
                                                <img src={item.item.imageUrl} alt={item.item.title} className={styles.itemImage}/>
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <div className={styles.itemTitle}>{item.item.title}</div>
                                                <div className={styles.itemQuantity}>Количество: {item.quantity} шт.</div>
                                                <div className={styles.itemPrice}>Цена: {item.item.cost * item.quantity} руб.</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.orderTotal}>Итого: {order.total} руб.</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>У вас нет заказов</div>
            )}
        </div>
    );



};

export default MyOrders;