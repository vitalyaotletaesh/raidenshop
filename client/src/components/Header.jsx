import React from 'react';
import styles from './Header.module.css';
import {Link, Navigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../redux/slices/auth";

const Header = () => {
    const [isExit, setIsExit] = React.useState(false);

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const role = window.localStorage.getItem('role')

    const onClickLogout = () => {
        if (window.confirm('Вы уверены, что хотите выйти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('role');
            window.localStorage.removeItem('userId');
            setIsExit(true)
        }
    }

    React.useEffect(() => {
        setIsExit(false);
    }, [isAuth]);

    if (isExit) {
        return <Navigate to='/login' />;
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link to='/'>
                        <span>ＲａｉｄｅｎＳｈｏｐ</span>
                    </Link>
                </div>
                <div className={styles.rightContent}>
                    {!isAuth
                        ?
                        <>
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
                        </>
                        :
                        <>
                            {role === 'Admin' &&
                                <Link to='/admin'>
                                    <div className={styles.cart}>
                                        Админка
                                    </div>
                                </Link>
                            }
                            <div onClick={onClickLogout} className={styles.cart}>
                                Выйти
                            </div>
                        </>
                    }
                    <Link to='/cart'>
                        <div className={styles.cart}>
                            <img src="img/cart.png" alt="Корзина"/>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={styles.divider}></div>
        </>
    )
};

export default Header;