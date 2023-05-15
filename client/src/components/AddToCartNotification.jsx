import React from 'react';
import styles from './AddToCartNotification.module.css'


const AddToCartNotification = ({ show, text }) => {
    const [isShown, setIsShown] = React.useState(false);

    React.useEffect(() => {
        if (show) {
            setIsShown(true);
            setTimeout(() => {
                setIsShown(false);
            }, 3000);
        }
    }, [show]);

    return (
        <div className={`${styles.notification} ${isShown ? styles.show : ''}`}>
            {text}
        </div>
    );
};

export default AddToCartNotification;
