const slugify = require('slugify');
const {
    Types
} = require('mongoose');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

module.exports = {
    // TODO : ADD MORE PARAMS FOR SELECTION { Category, User, Limit,  }
    recipes: async () => {
        const recipesSelected = await Recipe.find()
        .sort({createdAt: 'desc'})
        .populate('category')
        .populate('user');
        return recipesSelected.map(recipe => {
            return {
                ...recipe._doc,
                _id: recipe.id,
                createdAt: new Date(recipe.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(recipe.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
        });
    },
    recipe: async ({recipe}) => {
        const recipesSelected = await Recipe.findById(Types.ObjectId(recipe))
        .populate('category')
        .populate('user');
        return {
            ...recipesSelected._doc,
            _id: recipesSelected.id,
            createdAt: new Date(recipesSelected.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date(recipesSelected.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
        }
    },
    reviews: async ({ recipe }) => {
        try {
            const selectedRecipe = await Recipe.findById(Types.ObjectId(recipe));
            if(selectedRecipe){
                return selectedRecipe.reviews;
            }
        } catch (err) {
            throw err;
        }
    },
    createRecipe: async ({ recipe, category }) => {
        // TODO : VALIDATE IF CATEGORY EXISTS
        // TODO : VALIDATE ID USER EXISTS / Authenticated
        try {
            const user = await User.findOne();
            const newRecipe = new Recipe({
                ...recipe,
                category,
                user: user.id,
                slug: slugify(recipe.name),
                accepted: false,
                bloqued: false
            });
            const result = await newRecipe.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            }
        } catch (err) {
            throw err;
        }
    },
    updateRecipe: async ({id, recipe, category}) => {
        try {
            const user = await User.findOne();
            const editedRecipe = await Recipe.findByIdAndUpdate(
                Types.ObjectId(id), 
                {
                    ...recipe,
                    category: category,
                    user: user.id,
                    slug: slugify(recipe.name)
                }
            ).populate('category')
            .populate('user');
            console.log({edited: [editedRecipe.accepted, editedRecipe.bloqued]})
            return {
                ...editedRecipe._doc,
                _id: editedRecipe.id,
                createdAt: new Date(editedRecipe.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(editedRecipe.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            }
        } catch (err) {
            throw err;
        }
    }
    
};