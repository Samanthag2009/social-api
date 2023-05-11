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
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        thoughts: {
            type: string,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    id: false
    },
);

//Schema for Reactions

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: new
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: string,
            required: true
        },
        reactionBody: {
            type: string,
            required: true,
            maxlength: 280
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    id: false
    },
);



//virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get( () => {
    return this.reactions.length;
});

//create model
const Thought = model('Thought', ThoughtSchema);

//export model
module.exports = Thought;