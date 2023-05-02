// eslint-disable-next-line react/prop-types
const CommentList = ({ comments }) => {
  // eslint-disable-next-line react/prop-types
  const renderedComments = comments.map((comment) => {
      let content;
      if (comment.status === "approved") {
        content = comment.content;
      }

      if (comment.status === "pending") {
        content = "this comment is awaiting moderation";
      }

      if (comment.status === "rejected") {
        content = "this comment has been rejected";
      }
      return <li key={comment.commentId}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
