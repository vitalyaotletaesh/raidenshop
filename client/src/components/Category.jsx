import React from 'react';
import styles from './Category.module.css'

const Category = ({category, onClickCategory}) => {
    const [isActive, setIsActive] = React.useState(false)

    return (
        <>
            <div className={!isActive ? styles.category : styles.active} onClick={() => onClickCategory(category)}>
                    <span>
                        {category}
                    </span>
            </div>
        </>
    );
};

export default Category;