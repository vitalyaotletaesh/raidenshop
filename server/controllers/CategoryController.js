import CategoryModel from "../models/Category.js";

export const addCategory = async (req, res) => {
    try {
        const category = req.body.category;

        const doc = new CategoryModel({
            category: category,
        });

        await doc.save();

        res.json({
            doc
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать категорию',
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const items = await CategoryModel.find();

        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить категории',
        })
    }
}