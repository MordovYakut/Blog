import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'

import { deleteComment } from '../redux/features/comment/commentSlice'

export const CommentItem = ({ cmt }) => {
  const avatar = cmt.comment && cmt.comment.trim().toUpperCase().split('').slice(0, 2)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const deleteCommentHandler = async () => {
    console.log(cmt._id)
    try {
      await dispatch(deleteComment(cmt._id, cmt.post))
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center gap-3 border px-2 py-2 rounded border-black'>
        <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
            {avatar}
        </div>
        <div className="flex flex-col">
          <div className="text-white text-[15px]">
              {cmt.username}
          </div>
          <div className="text-gray-300 text-[10px]">
              {cmt.comment}
          </div>
        </div>
        {
          user?._id === cmt.author && (
            <button 
              onClick={deleteCommentHandler}
              className='flex flex-auto justify-end px-1 text-white opacity-50'>
                <AiFillDelete />
            </button>
          )
        }
    </div>
  )
}
