const { Schema, model } = require('mongoose');

//Schema for Thought
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: string,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        email: {
            type: string,
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

//virtual for friendCount

UserSchema.virtual('friendCount').get( () => {
    return this.friends.length;
});

//create model
const Thought = model('Thought', UserSchema);

//export model
module.exports = Thought;