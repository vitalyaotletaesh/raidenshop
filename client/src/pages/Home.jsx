import React from 'react';
import Items from "../components/Items";
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../redux/slices/items";
import styles from './Home.module.css';
import Category from "../components/Category";
import axios from "../axios";
import AddToCartNotification from "../components/AddToCartNotification";

const Home = () => {
    const [showNotification, setShowNotification] = React.useState(false);
    const [data, setData] = React.useState()
    const [itemsByCategory, setItemsByCategory] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    const [category, setCategory] = React.useState('Все')

    React.useEffect(() => {
        axios.get('/category/getAll').then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    React.useEffect(() => {
        console.log(category)
        axios.post('/getAllByCategory', {category: category}).then(res => {
            setItemsByCategory(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [category])

    const dispatch = useDispatch();
    const {items} = useSelector(state => state.items);

    const isItemsLoading = items.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchItems());
    }, []);

    return (
        <div>
            <div className={styles.category_container}>
                {(isLoading ? [...Array(6)] : data).map((obj, index) =>
                    isLoading
                        ? <h1 key={index}> </h1>
                        : <Category key={index} category={obj.category} onClickCategory={(id) => setCategory(id)}/>
                )}
            </div>

            <div className={styles.items_container}>
                {}
                {category === 'Все'
                    ?
                    (isItemsLoading ? [...Array(5)] : items.components).map((obj, index) =>
                        isItemsLoading
                            ? <h1 key={index}> </h1>
                            : <Items key={index} title={obj.title} cost={obj.cost} imageUrl={obj.imageUrl} id={obj._id}/>
                    )
                    :
                    (isLoading ? [...Array(6)] : itemsByCategory).map((obj, index) =>
                        <Items key={index} title={obj.title} cost={obj.cost} imageUrl={obj.imageUrl} id={obj._id}/>
                    )

                }
            </div>
        </div>
    );
};

export default Home;