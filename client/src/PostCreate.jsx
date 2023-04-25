import { useState } from 'react'
import axios from "axios"



const PostCreate = () => {
    const [title, setTitle] = useState("")
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/posts", { title })
        setTitle('')
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e)=> setTitle(e.target.value)} className="form-control" />
        </div>
        <button
          type="submit"
          style={{ marginTop: "10px" }}
          className="btn btn-primary"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default PostCreate