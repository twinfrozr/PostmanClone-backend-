import { Router } from "express";
import{login} from "../controllers/authController"
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.post("/login", login);

module.exports = router