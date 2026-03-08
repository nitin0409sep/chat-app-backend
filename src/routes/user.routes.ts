import { Router } from 'express'
const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "User Api's are working fine"
    })
})

export { userRouter }