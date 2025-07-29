const { Router } = require("express");
const { authorControllers } = require("../controllers");

const router = Router();

router.get("/", authorControllers.getAuthorsStats);

module.exports = router;
