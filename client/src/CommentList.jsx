// eslint-disable-next-line react/prop-types
const CommentList = ({ comments }) => {
  // eslint-disable-next-line react/prop-types
  const renderedComments = comments.map((comment) => {
    return <li key={comment.commentId}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
