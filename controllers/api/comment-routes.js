const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// View all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// View a single comment by searching id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const commentData = await Comment.findAll({
      where: {
        id: id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post route to create a new comment
router.post("/", withAuth, async (req, res) => {
  const user_id = req.session.user_id;
  const comment_text = req.body.comment_text;
  const thought_id = req.body.thought_id;
  try {
    const newComment = await Comment.create({
      comment_text: comment_text,
      user_id: user_id,
      thought_id: thought_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
