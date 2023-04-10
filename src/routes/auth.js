import express from "express"
import { singup, singin, getuser, removeUser } from "../controllers/auth";

const router = express.Router();

router.post("/signup", singup);
router.post("/signin", singin);
router.get("/signin", getuser);
router.delete("/users", removeUser)
export default router