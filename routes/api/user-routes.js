const router = require("express").Router(); 

const {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUserById,
    deleteUserById,
    newFriendToList,
    deleteFriendFromList
} = require("..//../controllers/user-controller");

//GET all users, POST new user on api/user
router.route("/").get(getAllUsers).post(postNewUser);

//GET user, PUT user, DELETE user all by id /api/user:id
router.route("/:id").get(getUserById).post(updateUserById).delete(deleteUserById);

//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list

router.route("/:thoughts/:userId/friends/:friendIs").post(newFriendToList).delete(deleteFriendFromList);

module.exports = router;