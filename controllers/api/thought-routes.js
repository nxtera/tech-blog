const router = require("express").Router();
const { Thought, User } = require("../../models");
const withAuth = require("../../utils/auth");

// View all thoughts
router.get("/", (req, res) => {
  Thought.findAll()
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// View a single thought by searching thought id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const thoughtData = await Thought.findAll({
      where: {
        id: id,
      },
    });
    if (!thoughtData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post thoughts
router.post("/", withAuth, async (req, res) => {
  const title = req.body.title;
  const user_id = req.session.user_id;
  const content = req.body.content;
  try {
    const thought = await Thought.create({
      title: title,
      content: content,
      user_id: user_id,
    });
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Update thought based on the id given in the request parameters.
router.put("/:id", withAuth, async (req, res) => {
  const newThoughtTitle = req.body.newThoughtTitle;
  const newThoughtContent = req.body.newThoughtContent;
  try {
    const thoughtData = await Thought.update(
      {
        title: newThoughtTitle,
        content: newThoughtContent,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.status(200).json("Thought updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comment based on the comment_id given in the request parameters.
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const thoughtData = await Thought.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.status(200).json("Thought deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
