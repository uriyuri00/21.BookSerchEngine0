// Routes are: /api/users

const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createUser);
//.put(authMiddleware, saveBook);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/books/:bookId").delete(authMiddleware, deleteBook);
/**
 * client/utils/API.js:
 * fetch("/api/users/books/5", {
 *  method: "DELETE"
 * }).then...
 */

module.exports = router;
