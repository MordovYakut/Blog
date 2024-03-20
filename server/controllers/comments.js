import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";

// Create comment
export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const user = await User.findById(req.userId);

    if (!comment)
      return res.json({ message: "Комментарий не может быть пустым" });

    const newComment = new Comment({
      username: user.username,
      comment,
      post: postId,
      author: req.userId,
    });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }

    res.json(newComment);
  } catch (error) {
    res.json({ message: "Что-то пошло не так" });
    console.log(error);
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment)
      return res.json({ message: "Такого комментария не существует" });

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: req.params.id },
    });

    res.json({ message: "Комментарий был удалён" });
  } catch (error) {
    console.log("Что-то пошло не так");
    console.log(error);
  }
};
