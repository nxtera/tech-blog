const router = require("express").Router();
const { Comment, Thought, User } = require("../models");
const withAuth = require("../utils/auth");

// Render dashboard page
router.get("/", withAuth, (req, res) => {
  Thought.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbThoughtData) => {
      const thoughts = dbThoughtData.map((thought) =>
        thought.get({ plain: true })
      );
      const username = req.session.username;
      console.log(thoughts);
      console.log(username);
      res.render("dashboard", { thoughts, username, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbThoughtData = await Thought.findByPk(req.params.id);
    if (dbThoughtData) {
      const thought = dbThoughtData.get({ plain: true });
      res.render("edit-thought", {
        thought,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/newthought", withAuth, (req, res) => {
  res.render("new-thought");
});

module.exports = router;
