const router = require("express").Router();
const { User, Comment } = require("../../models");


// Find all users
router.get("/", (req, res) => {
    User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Comment,
        },
      ],
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  });

  // Find one user by their id
router.get("/:id", (req, res) => {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Comment,
        },
      ],
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Create users with a post request
router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then((newUser) => {
        req.session.save(() => {
          req.session.user_id = newUser.id;
          req.session.username = newUser.username;
          req.session.loggedIn = true;
  
          res.json(newUser);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });