import React from 'react';
import styles from './Header.module.css';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link to='/'>
                        <span>ＲａｉｄｅｎＳｈｏｐ</span>
                    </Link>
                </div>
                <Link to='/login'>
                    <div className={styles.cart}>
                        Войти
                    </div>
                </Link>
                <Link to='/register'>
                    <div className={styles.cart}>
                        Зарегистрироваться
                    </div>
                </Link>
                <Link to='/cart'>
                    <div className={styles.cart}>
                        <img src="img/cart.png" alt="Корзина"/>
                    </div>
                </Link>
            </div>
            <div className={styles.divider}></div>
        </>
    )
};

export default Header;