const { Router } = require("express");
const { loginControllers } = require("../controllers");

const router = Router();

router.post("/", loginControllers.userLogin);

module.exports = router;
