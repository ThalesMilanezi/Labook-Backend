import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./router/UserRouter"
import { friendshipRouter } from "./router/FriendshipRouter";
import { postRouter } from "./router/PostRouter";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/friendship/", friendshipRouter)
app.use("/post", postRouter)
app.use("/", userRouter)

export default app