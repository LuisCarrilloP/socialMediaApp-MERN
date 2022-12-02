import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js';

const postRouter = express.Router()

//*ROUTER
postRouter.get("/", verifyToken, getFeedPosts)
postRouter.get("/:userId/posts", verifyToken, getUserPosts)

//*UPDATE
postRouter.patch("/:id/like", verifyToken, likePost)

export default postRouter