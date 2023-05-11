const { Schema, model } = require('mongoose');

//Schema for Reactions

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true
        },
        reactionBody: {
            type: String,
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


//Schema for Thought
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
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
            type: String,
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



//virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get( () => {
    return this.reactions.length;
});

//create model
const Thought = model('Thought', ThoughtSchema);

//export model
module.exports = Thought;