const { Thought, User } = require("../models");

const userController = {
    //GET all users
    async getAllUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }, 
    //POST new user
    async postNewUser(req, res) {
        try {
            const userData = await User.create(req.body)
            
            res.json(userData);
            
        } catch (error) {
            res.status(500).json(error);
        }
       },
    //GET user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({_id: req.params.user})
            .populate ({
                path: "thought",
                select: '-__v'
            })

            if(!user) {
                return res.status(404).json({ message: "No user with that ID"})
            };
            res.json(user);
        } catch(error) {
            res.status(500).json(error);
        }
    },
    //PUT user by id
    async updateUserById(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {runValidators: true, new: true}
            );
            if (!user) {
                res.status(404).json({ message: "no user with this id!"})
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //DELETE user by id
    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.thoughtId });
            
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }
            res.json({ message: "user deleted" });
        } catch (error) {
            res.status(500).json(error);
          }
    },
    //POST new friend to user friend list
    newFriendToList({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $addToSet: { friends: params.friendsId } },
          { new: true }
        )
          .then((userData) => res.json(userData))
          .catch((err) => res.status(400).json(err));
      },
    //DELETE friend from user friend list
    deleteFriendFromList({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendsId } },
          { new: true }
        )
          .then((userData) => {
            if (userData) {
              res.status(404).json({ message: "no user found with this ID" });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(400).json(err));
      },
};


module.exports = userController;