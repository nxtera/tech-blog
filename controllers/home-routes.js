const router = require("express").Router();
const { Thought, Comment, User } = require("../models/");

// Render homepage with all thoughts
router.get("/", async (req, res) => {
  try {
    console.log("hello");
    const dbThoughtData = await Thought.findAll({
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const thoughts = dbThoughtData.map((thought) =>
      thought.get({ plain: true })
    );
    console.log("userdata", thoughts);
    res.render("homepage", { thoughts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get request for single thought by id
router.get("/thought/:id", (req, res) => {
  Thought.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,

        include: {
          model: User,
        },
      },
      {
        model: User,
      },
    ],
  })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({
          message: "No thought found with this id",
        });
        return;
      }
      const thought = dbThoughtData.get({ plain: true });
      console.log(thought);
      res.render("single-thought", { thought, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
