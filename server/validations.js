import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не короче 4 символов').isLength({min: 4}),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не короче 4 символов').isLength({min: 4}),
    body('fullName', 'Укажите ваше имя').isLength({min: 2}),
];

export const itemCreateValidation = [
    body('title', 'Введите имя товара').isLength({min: 2}).isString(),
    body('description', 'Введите описание товара').isLength({min: 2}).isString(),
    body('cost', 'Укажите цену товара').isLength({min: 1}).isNumeric(),
    body('category', 'Укажите категорию').isLength({min: 1}).isString(),
    body('imageUrl', 'Вставьте ссылку на изображение').isString(),
];