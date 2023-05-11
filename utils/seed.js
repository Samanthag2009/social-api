const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (error) => error);

connection.once('open', async () => {
    console.log("connected!");

    //drop existing Users
    await User.deleteMany({});

    //drop existing thoughts
    await Thought.deleteMany({});

    await Thought.collection.insertOne({
        thoughtText: "I sure do like ice",
        username: "iceCube42"
    });

    await User.collection.insertOne({
        username: "iceCube42",
        email: "ice_cube@cold.gov"
    });

    console.info('seeds planted!');
    process.exit(0);

});