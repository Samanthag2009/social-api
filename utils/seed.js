const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (error) => error);

connection.once('open', async () => {
    console.log("connected!");

    
})