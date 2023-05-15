import React from 'react';
import styles from './Admin.module.css'
import axios from "../axios";
import AddToCartNotification from "../components/AddToCartNotification";

const Admin = () => {
    const [showNotification, setShowNotification] = React.useState(false);
    const [showNotificationItem, setShowNotificationItem] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [category, setCategory] = React.useState('Кружки');
    const [imageUrl, setImageUrl] = React.useState('');

    const [titleDirty, setTitleDirty] = React.useState(false);
    const [descriptionDirty, setDescriptionDirty] = React.useState(false);
    const [costDirty, setCostDirty] = React.useState(false);
    const [imageUrlDirty, setImageUrlDirty] = React.useState(false);

    const [titleError, setTitleError] = React.useState('Заполните это поле');
    const [descriptionError, setDescriptionError] = React.useState('Заполните это поле');
    const [costError, setCostError] = React.useState('Заполните это поле');
    const [imageUrlError, setImageUrlError] = React.useState('Заполните это поле');

    const [formValid, setFormValid] = React.useState(false);

    const onSubmit = async () => {
        const params = {
            title: title,
            description: description,
            cost: cost,
            category: category,
            imageUrl: imageUrl
        }

        await axios.post('/items', params)

        setShowNotificationItem(true)
        setTimeout(() => {
            setShowNotificationItem(false)
        }, 1000);

        console.log(params)
    };

    React.useEffect(() => {
        if (titleError || descriptionError || costError || imageUrlError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [titleError, descriptionError, costError, imageUrlError]);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true);
                break;
            case 'description':
                setDescriptionDirty(true);
                break;
            case 'cost':
                setCostDirty(true);
                break;
            case 'imageUrl':
                setImageUrlDirty(true);
                break;
            default:
        }
    }

    const titleHandler = (e) => {
        setTitle(e.target.value);
        if (e.target.value.length < 2) {
            setTitleError('Минимум 2 символа');
        } else {
            setTitleError('');
        }
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
        if (e.target.value.length < 2) {
            setDescriptionError('Минимум 2 символа');
        } else {
            setDescriptionError('');
        }
    }

    const costHandler = (e) => {
        setCost(e.target.value)
        if (e.target.value.length < 1) {
            setCostError('Некорректная цена');
        } else {
            setCostError('');
        }
    }

    const imageUrlHandler = (e) => {
        setImageUrl(e.target.value)
        const re = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        if (!re.test(String(e.target.value))) {
            setImageUrlError('Некорректная ссылка');
        } else {
            setImageUrlError('');
        }
    }

    const categoryHandler = (e) => {
        setCategory(e.target.value)
    }


    // ПОЛУЧАЮ ВСЕ ЗАКАЗЫ
    const [orders, setOrders] = React.useState([]);

    // Тут очень сложный код. Сначала я получаю все заказы, а потом по ID каждого товара в заказе, получаю информацию о
    // нём
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/getOrders');
                const orders = response.data;
                const items = await Promise.all(
                    orders.flatMap((order) => order.items.map((item) => item.item))
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .map((itemId) => axios.get(`/items/${itemId}`))
                );
                const itemsById = Object.fromEntries(items.map((item) => [item.data._id, item.data]));
                setOrders(orders.map((order) => ({
                    ...order,
                    items: order.items.map((item) => ({
                        ...item,
                        item: itemsById[item.item]
                    }))
                })));
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    const closeOrder = async (orderId) => {
        try {
            await axios.put(`/closeOrder/${orderId}`);
            setShowNotification(true)
            setTimeout(() => {
                setShowNotification(false)
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form>
                <h1 className={styles.title}>Создание нового товара</h1>

                {(titleDirty && titleError) && <div className={styles.inputError}>{titleError}</div>}
                <input value={title} onChange={(e => titleHandler(e))} onBlur={(e => blurHandler(e))} type="text"
                       name='title' placeholder='Title'/>

                {(descriptionDirty && descriptionError) && <div className={styles.inputError}>{descriptionError}</div>}
                <input value={description} onChange={(e => descriptionHandler(e))} onBlur={(e => blurHandler(e))}
                       type="text" name='description' placeholder='Description'/>

                {(costDirty && costError) && <div className={styles.inputError}>{costError}</div>}
                <input value={cost} onChange={(e => costHandler(e))} onBlur={(e => blurHandler(e))}
                       type="number" min='0' name='cost' placeholder='Cost'/>

                <select value={category} onChange={categoryHandler}>
                    <option value='Кружки'>Кружка</option>
                    <option value='Футболки'>Футблока</option>
                    <option value='Значки'>Значок</option>
                    <option value='Подушки'>Подушка</option>
                    <option value='Плакаты'>Плакат</option>
                </select>

                {(imageUrlDirty && imageUrlError) && <div className={styles.inputError}>{imageUrlError}</div>}
                <input value={imageUrl} onChange={(e => imageUrlHandler(e))} onBlur={(e => blurHandler(e))}
                       type="text" name='imageUrl' placeholder='Image URL'/>

                <div className={styles.button_container}>
                    <button disabled={!formValid} onClick={onSubmit} type='button'>Создать</button>
                    {showNotificationItem && <AddToCartNotification show={showNotificationItem} text={"Товар создан!"}/>}
                </div>
            </form>


            {orders && orders.length > 0 ? (
                <div className={styles.orderContainer}>
                    {orders.map((order) => (
                        <div key={order._id} className={styles.order}>
                            <div className={styles.orderHeader}>
                                <div className={styles.orderId}>Заказ #{order._id}</div>
                                <div className={styles.orderDate}>Дата заказа: {new Date(order.createdAt).toLocaleDateString()}</div>
                                <div className={styles.orderStatus} style={{ color: order.status === 'Открыт' ? 'green' : 'red' }}>Статус заказа: {order.status}</div>
                            </div>
                            <div className={styles.itemListContainer}>
                                <ul className={styles.itemList}>
                                    {order.items.map((item) => (
                                        <li key={item._id} className={styles.item}>
                                            <div className={styles.itemImageContainer}>
                                                <img src={item.item.imageUrl} alt={item.item.title} className={styles.itemImage}/>
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <div className={styles.itemTitle}>{item.item.title}</div>
                                                <div className={styles.itemQuantity}>Количество: {item.quantity} шт.</div>
                                                <div className={styles.itemPrice}>Цена: {item.item.cost * item.quantity} руб.</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.orderTotal}>Итого: {order.total} руб.</div>
                            <div className={styles.button_container2}>
                                <button onClick={() => closeOrder(order._id)}> Закрыть заказ </button>
                                {showNotification && <AddToCartNotification show={showNotification} text={"Заказ закрыт!"}/>}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>Нет активных заказов</div>
            )}
        </>
    );
};

export default Admin;