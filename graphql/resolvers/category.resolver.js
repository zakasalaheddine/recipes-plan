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
    category: async ({ id }) => {
        try {
            const categoriesSelected = await Category.findById(Types.ObjectId(id)).populate('parent');
            return {
                ...categoriesSelected._doc,
                _id: categoriesSelected.id,
                createdAt: new Date(categoriesSelected.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(categoriesSelected.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
        } catch (err) {
            throw err;
        }
    },
    createCategory: async ({name, parent, image, bloqued}) => {
        try {
            const category = new Category({
                name: name,
                slug: slugify(name),
                parent: parent != undefined ? parent : null,
                image : image,
                bloqued: bloqued
            });
            let result = await category.save();
            result = {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
            return result;
        } catch (err) {
            throw err;
        }
    },
    updateCategory: async ({ id, name, parent, image, bloqued }, req) => {
        try {
            const category = await Category.findById(Types.ObjectId(id));
            category.name = name;
            category.slug = slugify(name);
            category.parent = parent != 0 ? parent : null;
            category.image = image;
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