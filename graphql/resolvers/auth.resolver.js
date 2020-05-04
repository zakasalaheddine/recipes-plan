const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async ({ email, password }, req) => {
        let user = null;
        try {
            user = await User.findOne({
                email: email
            });
        } catch (err) {
            throw new Error(err);
        }
        if (!user)
            throw new Error('User does not exist');

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual)
            throw new Error('Password incorrect!');

        const access_token = jwt.sign({
            userId: user.id
        }, process.env.ACCESS_SECRET, {
            expiresIn: '1h'
        });
        req.isAuth = true;
        return {
            user: {
                ...user._doc,
                _id: user.id,
                createdAt: new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(user.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            },
            access_token
        };
    }
}