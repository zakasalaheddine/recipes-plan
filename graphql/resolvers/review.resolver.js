const { Types} = require('mongoose');
const Recipe = require('../../models/Recipe');
const Post = require('../../models/Post');

module.exports = {
    addReview: async ({ id, reviewType, review }) => {
        try {
            console.log(reviewType)
            if(reviewType == "recipe"){
                const selectedRecipe = await Recipe.findById(Types.ObjectId(id));
                if(selectedRecipe){
                    selectedRecipe.reviews.push(review);
                    const result = await selectedRecipe.save();
                    console.log(result.reviews);
                    return result.reviews;
                }
            }
            if(reviewType == "post"){
                const selectedPost = await Post.findById(Types.ObjectId(id));
                if(selectedPost){
                    selectedPost.reviews.push(review);
                    const result = await selectedPost.save();
                    console.log(result.reviews);
                    return result.reviews;
                }
            }
        } catch (err) {
            throw err;
        }
    }
}