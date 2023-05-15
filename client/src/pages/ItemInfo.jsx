import React from 'react';
import styles from './ItemInfo.module.css';
import {useParams} from "react-router-dom";
import axios from "../axios";
import Item from "../components/Item";

const ItemInfo = () => {
    const [isItemLoading, setIsItemLoading] = React.useState(true);
    const [data, setData] = React.useState();
    const {id} = useParams();

    React.useEffect(() => {
        axios.get(`/items/${id}`).then(res => {
            setData(res.data);
            setIsItemLoading(false);
        }).catch((err) => {
            console.warn(err);
            alert('Ошибка при получении товара');
        });
    }, []);

    if (isItemLoading) {
        return <Item isItemLoading={isItemLoading}/>
    }

    return (
        <div className={styles.item_info}>
                <Item id={id} title={data.title} description={data.description} cost={data.cost}
                       imageUrl={data.imageUrl} category={data.category}/>
        </div>
    );
};

export default ItemInfo;