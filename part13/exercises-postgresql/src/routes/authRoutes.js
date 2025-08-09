const { Router } = require("express");
const { authControllers } = require("../controllers");

const router = Router();

router.post("/login", authControllers.login);
router.delete("/logout", authControllers.logout);

module.exports = router;
