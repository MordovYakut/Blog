import { Router } from "express";

import { createComment, deleteComment } from "../controllers/comments.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Create comment
router.post("/:id", checkAuth, createComment);

// Delete comment
router.delete("/:id", checkAuth, deleteComment);

export default router;
