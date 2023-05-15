import express, {json} from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {registerValidation, loginValidation, itemCreateValidation} from './validations.js';

import {checkAuth, handleValidationErrors} from "./utils/index.js";

import {UserController, ItemController, CartController, CategoryController, OrderController} from "./controllers/index.js";
import {getAllByCategory} from "./controllers/ItemController.js";
import {addItemToCart} from "./controllers/CartController.js";
import Order from "./models/Order.js";

mongoose
    .connect('mongodb+srv://admin:12345@cluster0.viww1fn.mongodb.net/raidenshop?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB err', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// ЮЗЕР
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// ЗАГРУЗКА ИЗОБРАЖЕНИЯ
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

// ТОВАРЫ
app.get('/items', ItemController.getAll);
app.get('/items/:id', ItemController.getOne);
app.post('/items', checkAuth, itemCreateValidation, handleValidationErrors, ItemController.create);
app.delete('/items/:id', checkAuth, ItemController.remove);
app.patch('/items/:id', checkAuth, itemCreateValidation, handleValidationErrors, ItemController.update);
app.post('/getAllByCategory', ItemController.getAllByCategory);

// КОРЗИНА
app.post('/cart/addItem', checkAuth, CartController.addItemToCart)
app.get('/cart/:userId', checkAuth, CartController.getCartOwner)
app.delete('/clearCart/:userId', checkAuth, CartController.clearCart)
app.delete('/cart/item/:id', checkAuth, CartController.removeItemFromCart)

// ЗАКАЗ
app.post('/orders', checkAuth, OrderController.createOrder)
app.get('/getOrders', checkAuth, OrderController.getOrders)
app.put('/closeOrder/:id', checkAuth, OrderController.closeOrder)
app.get('/api/orders/user/:id', checkAuth, OrderController.getUserOrders )

// КАТЕГОРИИ
app.post('/createCategory', handleValidationErrors, CategoryController.addCategory);
app.get('/category/getAll', CategoryController.getAll)

app.listen(4444, (err) => {
    if (err) {
        return console.log('err');
    }
    console.log('Server ok');
});