const { Thought, User } = require("../models");

const thoughtController = {
    //GET all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    }, 
    //GET thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thought})
            .select('-__v');

            if(!user) {
                return res.status(404).json({ message: "No user with that ID"})
            };
            res.json(user);
        } catch(error) {
            res.status(500).json(error);
        }
    },
    //POST new thought then update user information
   async postNewThought(req, res) {
    try {
        const thoughtData = await Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, {$push: {thought: _id}}, {new: true});
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: "No thought with this id" });
                return;
            }
            res.json(thoughtData);
        })
    } catch (error) {
        res.status(500).json(error);
    }
   },
    //PUT thought by id
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                {runValidators: true, new: true}
            );
            if (!thought) {
                res.status(404).json({ message: "no thought with this id!"})
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //DELETE thought by id
    async deleteThoughtById(res, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: "thought deleted" });
        } catch (error) {
            res.status(500).json(error);
          }
    },
   
    //POST to create a reaction stored in a single thought's reactions array field
    newReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $addToSet: { reactions: body } },
          { new: true }
        )
          .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "No thought with this id" });
              return;
            }
            res.json(thoughtData);
          })
          .catch((error) => res.json(error));
      },

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then((thoughtData) => res.json(thoughtData))
          .catch((error) => res.json(error));
      },
};

module.exports = thoughtController;