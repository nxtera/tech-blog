const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
const commentRoutes = require("./comment-routes")

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes)

module.exports = router;