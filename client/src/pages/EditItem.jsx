import React from 'react';
import styles from "./Admin.module.css";
import AddToCartNotification from "../components/AddToCartNotification";
import axios from "../axios";

const EditItem = () => {
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

        const url = window.location.href;
        const id = url.split('/').pop();
        console.log(id);

        await axios.patch(`/items/${id}`, params)

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

    return (
        <div>
            <form>
                <h1 className={styles.title}>Редактирование товара</h1>

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
                    <button disabled={!formValid} onClick={onSubmit} type='button'>Редактировать</button>
                    {showNotificationItem && <AddToCartNotification show={showNotificationItem} text={"Товар отредактирован!"}/>}
                </div>
            </form>
        </div>
    );
};

export default EditItem;