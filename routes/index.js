//import express and all api routes
const router = require("express").Router();
const allRoutes = require("./api");

//noting all imported routes with "/api"
router.use("/api", allRoutes);

//use and report error is needed
router.use((req, res)  => {
    res.status(404).send("Error 404: Not Found")
});

module.exports = router;