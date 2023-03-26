import React from 'react';
import Items from "../components/Items";
import axios from "../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../redux/slices/items";
import styles from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const {items, category} = useSelector(state => state.items);

    const isItemsLoading = items.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchItems());
    }, []);

    console.log(items);

    return (
        <div>
            <div className={styles.items_container}>
                {(isItemsLoading ? [...Array(5)] : items.components).map((obj, index) =>
                    isItemsLoading
                        ? <h1 key={index}>Загрузка</h1>
                        : <Items key={index} title={obj.title} cost={obj.cost} imageUrl={obj.imageUrl}/>
                )}
            </div>
        </div>
    );
};

export default Home;