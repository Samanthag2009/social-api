// Require express and mongoose
const express = require('express');
const db = require("./config/connection")
const routes = require("./routes")
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(require('./routes'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// // Connect mongoose
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Log mongoose queries
// mongoose.set('debug', true);

// app.listen(PORT, () => console.log(`Connected on localhost:${PORT}!`));