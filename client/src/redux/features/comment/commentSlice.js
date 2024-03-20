import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, username, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        username,
        comment,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, postId) => {
    try {
      const { data } = await axios.delete(
        `/comments/${commentId}`,
        commentId,
        postId
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create post
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      })

      // Get post comments
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getPostComments.rejected, (state) => {
        state.loading = false;
      })

      // Get post comments
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
