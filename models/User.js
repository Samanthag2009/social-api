const { Schema, model } = require('mongoose');

//Schema for User

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    id: false
    },
);

//virtual for friendCout
UserSchema.virtual('friendCount').get( () => {
    return this.friends.length;
});

//create model
const User = model('User', UserSchema);

//export model
module.exports = User;