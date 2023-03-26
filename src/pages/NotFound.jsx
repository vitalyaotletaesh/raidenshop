import React from 'react';
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={styles.not_found}>
            <h1>Такой страницы не существует</h1>
        </div>
    );
};

export default NotFound;