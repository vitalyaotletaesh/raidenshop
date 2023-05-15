import ItemModel from '../models/Item.js';
import CategoryModel from '../models/Category.js';
import category from "../models/Category.js";

export const create = async (req, res) => {
    try {
        const categoryId = await CategoryModel.findOne({'category': req.body.category})

        const doc = new ItemModel({
            title: req.body.title,
            description: req.body.description,
            cost: req.body.cost,
            category: categoryId,
            imageUrl: req.body.imageUrl,
        });

        const item = await doc.save();

        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать товар',
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const items = await ItemModel.find();

        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товары',
        })
    }
}

export const getAllByCategory = async (req, res) => {
    try {
        const categoryId = await CategoryModel.findOne({'category': req.body.category})

        const items = await ItemModel.find({category: categoryId})
        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товары по категориям',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await ItemModel.findById(itemId);

        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товар',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const itemId = req.params.id;

        await ItemModel.findOneAndDelete(
            {
                _id: itemId,
            },
        ).then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Товар не найден',
                    });
                }

                return res.status(200).json({
                    message: 'Товар успешно удалён',
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товар для удаления',
        })
    }
}

export const update = async (req, res) => {
    try {
        const itemId = req.params.id;
        const categoryId = await CategoryModel.findOne({'category': req.body.category})

        await ItemModel.updateOne(
            {
                _id: itemId,
            },
            {
                title: req.body.title,
                description: req.body.description,
                cost: req.body.cost,
                category: categoryId,
                imageUrl: req.body.imageUrl,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товар для обновления',
        })
    }
}