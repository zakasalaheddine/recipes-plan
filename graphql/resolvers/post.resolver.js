const slugify = require('slugify');
const User = require('../../models/User');
const {
    Types
} = require('mongoose');

const Post = require('../../models/Post');

module.exports = {
    posts: async () => {
        try {
            const selectedPost = await Post.find().populate('category').populate('user');
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
    post: async ({ id }) => {
        try {
            const post = await Post.findById(Types.ObjectId(id)).populate('category').populate('user');
            return {
                ...post._doc,
                _id: post.id,
                createdAt: new Date(post.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(post.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
                
        } catch (err) {
            throw err;
        }
    },
    createPost: async ({ post, category }) => {
        try {
            const user = await User.findOne();
            const newPost = new Post({
                ...post,
                slug: slugify(post.title),
                category,
                user,
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
    },
    updatePost: async ({ id, post, category }) => {
        try {
            const selectedPost = await Post.findById(Types.ObjectId(id));
            if(selectedPost){
                selectedPost.title = post.title;
                selectedPost.thumbnail = post.thumbnail;
                selectedPost.slug = slugify(post.title);
                selectedPost.content = post.content;
                selectedPost.category = category;
                selectedPost.accepted = post.accepted;
                selectedPost.bloqued = post.bloqued;
                const result = await selectedPost.save();
                return {
                    ...result._doc,
                    _id: result.id,
                    createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                    updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
                };
            }
        } catch (err) {
            throw err;
        }
    }
};