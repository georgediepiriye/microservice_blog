import { useState } from 'react'
import axios from "axios"


// eslint-disable-next-line react/prop-types
const CommentCreate = ({postId} ) => {
    const [content, setContent] = useState('')
    
    const postComment = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:4000/posts/${postId}/comments`, { content })
        setContent('')
        
    }
  return (
      <div>
          <form onSubmit={postComment}>
              <div className="form-group">
                  <label>New Comment</label>
                  <input value={content} onChange={(e)=>setContent(e.target.value)} className='form-control'/>
              </div>
              <button type='submit' style={{marginTop:"10px"}} className='btn btn-primary'>submit</button>
              
          </form>
    </div>
  )
}


export default CommentCreate