const router = require("express").router 

const {
    getAllThoughts,
    getThoughtById,
    postNewThought,
    updateThoughtById,
    deleteThoughtById,
    newReaction,
    deleteReactionById
} = require("..//../controllers/thought-controller");

//GET all thoughts, POST new thought on api/thoughts
router.route("/").get(getAllThoughts).post(postNewThought);

//GET thought, PUT thought, DELETE thought all by id /api/thoughts/:id
router.route("/:id").get(getThoughtById).post(updateThoughtById).delete(deleteThoughtById);

//POST to create a reaction stored in a single thought's reactions array field
//DELETE to pull and remove a reaction by the reaction's reactionId value

router.route("/:thoughts/:thoughtId/reactions").post(newReaction).delete(deleteReactionById);

module.exports = router;