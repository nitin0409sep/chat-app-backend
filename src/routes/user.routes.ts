import { Router } from 'express'
export const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "User Api's are working fine"
    })
})
