import { Router } from "express";
import {registerUser,loginuser , logoutuser, refershAccessToken} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
             maxCount: 1
        },
        {
            name:"coverImage",
            maxCount : 1
        }

    ]),
    registerUser)

router.route("/login").post(loginuser)

//secure route
router.route("/logoutuser").post(verifyJWT, logoutuser)
router.route("/refresh-token").post(refershAccessToken)

export default router;