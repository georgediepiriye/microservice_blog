import { useEffect, useState } from 'react'
import axios from "axios"

// eslint-disable-next-line react/prop-types
const CommentList = ({postId}) => {
    const [comments, setComments] = useState([])

    const getCommentList = async () => {
        const res = await axios.get(`http://localhost:4000/posts/${postId}/comments`)
        setComments(res.data)
    }

    useEffect(() => {
        getCommentList()
    }, [])
    
    const renderedComments = comments.map(comment => {
        return <li key={comment.commentId}>{comment.content}</li>
  })

    return <ul>
        {renderedComments}
    </ul>
 
}

export default CommentList