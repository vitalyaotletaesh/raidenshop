import React from 'react';
import styles from './Items.module.css';
import {Link} from "react-router-dom";
import axios from "../axios";
import AddToCartNotification from './AddToCartNotification';


const Items = ({title, cost, imageUrl, id}) => {
    const [isAdmin, setIsAdmin] = React.useState('')
    const [showNotification, setShowNotification] = React.useState(false);
    const [showNotificationItem, setShowNotificationItem] = React.useState(false);

    React.useEffect(() =>{
        setIsAdmin(window.localStorage.getItem('role'))
    }, [])

    const removeItem = async () => {
        axios.delete(`/items/${id}`).then(() => {
            setShowNotificationItem(true)
            setTimeout(() => {
                setShowNotificationItem(false)
            }, 1000);
        }).catch(err => {
            console.log(err)
        })

    }

    const handleAddToCart = async () => {
        try {
            const responce = await axios.post('/cart/addItem', { itemId: id });
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 1000);
        } catch (error) {
            console.log(error.response.data);
        }
    }


    return (
        <div className={styles.item}>
            <div className={styles.btn_container}>
                {isAdmin === 'Admin'
                    &&
                    <div className={styles.delete_btn} onClick={removeItem}>
                        <span>x</span>
                    </div>
                }
                {isAdmin === 'Admin'
                    &&
                    <Link to={`/item/edit/${id}`}>
                        <div className={styles.edit_btn}>
                            <span>Edit</span>
                        </div>
                    </Link>
                }
            </div>
            <Link to={`/items/${id}`}>
                <div className={styles.item_image}>
                    <img src={imageUrl} alt="" width="300" height="300"/>
                </div>
                <div className={styles.item_name}>
                    <span>{title}</span>
                </div>
            </Link>
            <div className={styles.item_price}>
                <span>{cost} &#8381;</span>
            </div>
            <button className={styles.button} onClick={handleAddToCart}>Добавить в корзину</button>
            {showNotification && <AddToCartNotification show={showNotification} text={"Товар успешно добавлен в корзину!"}/>}
            {showNotificationItem && <AddToCartNotification show={showNotificationItem} text={"Товар удалён!"}/>}
        </div>
    )
};

export default Items;