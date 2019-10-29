const slugify = require('slugify');
const {
    Types
} = require('mongoose');

const Category = require('../../models/Category');

module.exports = {
    categories: async () => {
        try {
            const categoriesSelected = await Category.find().populate('parent');
            return categoriesSelected.map(category => {
                return {
                    ...category._doc,
                    _id: category.id,
                    createdAt: new Date(category.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                    updatedAt: new Date(category.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createCategory: async (args) => {
        try {
            console.log(args);
            const category = new Category({
                name: args.name,
                slug: slugify(args.name),
                parent: args.parent != undefined ? args.parent : null,
                bloqued: false
            });
            let result = await category.save();
            result = {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    },
    updateCategory: async ({ id, name, parent, bloqued }, req) => {
        try {
            const category = await Category.findById(Types.ObjectId(id));
            category.name = name;
            category.slug = slugify(name);
            category.parent = parent;
            category.bloqued = bloqued != null ? bloqued : category.bloqued;
            const result = await category.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
        } catch (err) {
            throw err;
        }
    },
    activateOrDesactivateCategory: async ({ id }, req) => {
        try {
            const category = await Category.findById(Types.ObjectId(id));
            category.bloqued = !category.bloqued;
            const result = await category.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
        } catch (err) {
            throw err;
        }
    }
};