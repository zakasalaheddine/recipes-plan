const { Types } = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const { registerValidation } = require('../../helpers/validations');

module.exports = {
    users: async () => {
        // TODO : ADD MORE PARAMS FOR MORE SELECTION TYPES (EMAIL, NAME, ID)
        try {
            const usersSelected = await User.find();
            return usersSelected.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdAt: new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                    updatedAt: new Date(user.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
                };
            });
        } catch (err) {
            throw err;
        }
    },
    register: async (args) => {
        try {
            // TODO : VALIDATE USER AUTHENTICATION MUST BE NULL
            const { error } = registerValidation(args);
            if(error) throw new Error(error.details[0].message);

            // IS EMAIL EXISTS
            const emailExist = await User.findOne({ email: args.email });
            if(emailExist) throw new Error('Email Already Exists');

            const hashedPassword = await bcrypt.hash(args.password, 16);

            const user = new User({
                name: args.name,
                email: args.email,
                password: hashedPassword
            });

            const result = await user.save();
            // TODO : SEND EMAIL VERIFICATION
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                updatedAt: new Date(result.updatedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };
            // TODO : LOG IN THE REGISTRED USER
        } catch (err) {
            throw err;
        }
    }
};