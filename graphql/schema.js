const { buildSchema, GraphQLScalarType } = require('graphql');

module.exports = buildSchema(`
    type Category {
        _id: ID!
        name: String!
        slug: String!
        image: String
        parent: Category
        bloqued: Boolean!
        createdAt: String
        updatedAt: String 
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        role: String!
        bloqued: Boolean!
        createdAt: String,
        updatedAt: String
    }

    type Review {
        user: ID!
        rating: Int!
        review: String
    }

    type recipeInfo {
        makingTime: String
        serving: String
        cals: String
    }

    type Recipe {
        _id: ID!
        name: String!
        slug: String!
        category: Category!
        user: User!
        info: recipeInfo
        description: String
        images: [String]
        ingredients: [String!]!
        directions: [String!]!
        reviews: [Review!]
        accepted: Boolean!
        bloqued: Boolean!
        createdAt: String,
        updatedAt: String
    }

    type Post {
        _id: ID!
        title: String!
        slug: String!
        category: Category!
        user: User!
        content: [String!]!
        thumbnail: String!
        recipes: [ID!]
        reviews: [Review!]
        accepted: Boolean!
        bloqued: Boolean!
        createdAt: String,
        updatedAt: String
    }

    input PostInput {
        title: String!
        content: [String]!
        thumbnail: String!
        accepted: Boolean!
        bloqued: Boolean!
    }

    input RecipeInput{
        name: String!
        info: RecipeInfosInput
        description: String
        images: [String]
        ingredients: [String!]!
        directions: [String!]!
        accepted: Boolean!
        bloqued: Boolean!
    }

    input RecipeInfosInput {
        makingTime: String
        serving: String
        cals: String
    }

    input ReviewInput{
        user: ID!
        rating: Int!
        review: String
    }

    enum ReviewType{
        recipe
        post
    }

    type Query {
        categories: [Category!]!
        category(id: ID!): Category!
        users: [User!]!
        recipes(category: ID): [Recipe!]!
        posts: [Post!]!
        post(id: ID!): Post!
        recipe(recipe: ID!): Recipe!
    }

    type Mutation {
        createCategory(name: String!, parent: ID, image: String, bloqued: Boolean): Category
        updateCategory(id: ID!, name: String!, parent: ID, image: String, bloqued: Boolean): Category
        activateOrDesactivateCategory(id: ID!): Category

        register(name: String!, email: String!, password: String!): User

        createRecipe(recipe: RecipeInput, category: ID!): Recipe
        updateRecipe(id: ID!, recipe: RecipeInput, category: ID!): Recipe

        createPost(post: PostInput, category: ID!): Post
        updatePost(id: ID!, post: PostInput, category: ID!): Post

        addReview(id: ID!, reviewType: ReviewType, review: ReviewInput): [Review!]
    }

    schema {
        query: Query
        mutation : Mutation
    }
`);