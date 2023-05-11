//import express and routes 
const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

//use and designate prefixes
router.use("/user", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;