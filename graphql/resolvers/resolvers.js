const categoryResolver = require('./category.resolver');
const userResolver = require('./user.resolver');
const recipeResolver = require('./recipe.resolver');
const reviewResolver = require('./review.resolver');
const postResolver = require('./post.resolver');


module.exports = {
    ...categoryResolver,
    ...userResolver,
    ...recipeResolver,
    ...reviewResolver,
    ...postResolver,
};