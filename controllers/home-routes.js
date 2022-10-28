const router = require("express").Router();
const { Thought, Comment, User } = require("../models/");

// get request for all thoughts
// router.get('/', async (req, res) => {
//     try {
//       const thoughtData = await Thought.findAll({
//         include: [User],
//       });

//       const thoughts = thoughtData.map((thought) => thought.get({ plain: true }));

//       res.render('all-thoughts', { thoughts });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// get request for all thoughts
router.get("/", (req, res) => {
  Thought.findAll({
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
  })
    .then((dbThoughtData) => {
      const thoughts = dbThoughtData.map((thought) =>
        thought.get({ plain: true })
      );
      console.log(thoughts);
      res.render("homepage", { thoughts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get request for single thought by id
router.get("/thought/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "thought_id",
          "user_id",
          "created_at",
        ],
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
  })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({
          message: "No thought found with this id",
        });
        return;
      }
      const thought = dbThoughtData.get({ plain: true });
      console.log(thought)
      res.render("single-thought", {thought, loggedIn: req.session.loggedIn,});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//   // get request for single thought by id
// router.get('/thought/:id', async (req, res) => {
//     try {
//       const thoughtData = await Thought.findByPk(req.params.id, {
//         include: [
//           User,
//           {
//             model: Comment,
//             include: [User],
//           },
//         ],
//       });

//       if (thoughtData) {
//         const thought = thoughtData.get({ plain: true });

//         res.render('single-thought', { thought });
//       } else {
//         res.status(404).end();
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

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
