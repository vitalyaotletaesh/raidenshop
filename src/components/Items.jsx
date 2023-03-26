import React from 'react';
import styles from './Items.module.css';
import {Link} from "react-router-dom";

const Items = ({title, cost, imageUrl}) => {
    return (
        <div className={styles.item}>
            <Link to='/item/123'>
                <div className={styles.item_image}>
                    <img src={imageUrl} alt="" width="300" height="300"/>
                </div>
                <div className={styles.item_name}>
                    <span>{title}</span>
                </div>
            </Link>
            <div className={styles.item_price}>
                <span>{cost}</span>
            </div>
            <button className={styles.button}>Добавить в корзину</button>
        </div>
    );
};

export default Items;