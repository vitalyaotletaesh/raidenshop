import Cart from "../models/Cart.js"
import mongoose from "mongoose";

export const addItemToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Неверный user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ error: 'Неверный item ID' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [{ item: itemId }] });
            await cart.save();
        } else {
            const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity++;
            } else {
                cart.items.push({ item: itemId });
            }

            await cart.save();
        }

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить в корзину товар',
        })
    }
};

export const getCartOwner = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.item');

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось получить корзину пользователя' });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.deleteOne({ user: userId });
        res.status(200).json({ message: "Корзина очищена" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось очистить корзину пользователя' });
    }
}

export const removeItemFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Неверный user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ error: 'Неверный item ID' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(400).json({ error: 'Корзина не найдена' });
        }

        const itemIndex = cart.items.findIndex((item) => item.item.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(400).json({ error: 'Товар не найден в корзине' });
        }

        if (cart.items[itemIndex].quantity === 1) {
            // Удаляем товар из корзины, если его количество стало равным 0
            cart.items.splice(itemIndex, 1);
        } else {
            // Уменьшаем количество товара на 1
            cart.items[itemIndex].quantity--;
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить товар из корзины',
        });
    }
};

