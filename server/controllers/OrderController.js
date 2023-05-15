import Order from '../models/Order.js'

export const createOrder = async (req, res) => {
    try {
        const userId = req.body.user
        const cartItems = req.body.items
        const total = req.body.total
        const order = await Order.create({ user: userId, items: cartItems, total: total});
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Не удалось оформить заказ'});
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'email');

        const comparator = (a, b) => {
            if (a.status === 'Открыт' && b.status === 'Закрыт') {
                return -1;
            } else if (a.status === 'Закрыт' && b.status === 'Открыт') {
                return 1;
            } else {
                return 0;
            }
        };

        orders.sort(comparator);

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Не удалось получить список заказов' });
    }
};

export const closeOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        order.status = 'Закрыт';
        await order.save();

        res.status(200).json({ message: 'Статус заказа изменен на "закрыт"' });
    } catch (error) {
        res.status(500).json({ message: 'Не удалось изменить статус заказа' });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.id });

        const comparator = (a, b) => {
            if (a.status === 'Открыт' && b.status === 'Закрыт') {
                return -1;
            } else if (a.status === 'Закрыт' && b.status === 'Открыт') {
                return 1;
            } else {
                return 0;
            }
        };

        orders.sort(comparator);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Ошибка при получении списка заказов пользователя:', error);
        res.status(500).json({ message: 'Не удалось получить список заказов пользователя' });
    }
}



