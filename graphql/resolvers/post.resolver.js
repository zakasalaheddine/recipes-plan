const slugify = require('slugify');
const {
    Types
} = require('mongoose');

const Post = require('../../models/Post');

module.exports = {
    posts: async () => {
        try {
            const selectedPost = await Post.find();
            return selectedPost.map(post => {
                return {
                    ...post._doc,
                    _id: post.id,
                    createdAt: new Date(post.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                    updatedAt: new Date(post.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createPost: async ({
        post,
        category,
        user
    }) => {
        try {
            const newPost = new Post({
                ...post,
                slug: slugify(post.title),
                category,
                user,
                accepted: false,
                bloqued: false,
            });
            const result = await newPost.save();
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