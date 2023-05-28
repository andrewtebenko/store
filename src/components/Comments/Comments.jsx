import { useState, useEffect } from "react";
import CommentContext from "./CommentContext";

const useLogComment = (comment) => {
  useEffect(() => {
    console.log(comment);
  }, [comment]);
};

const ProductPage = ({ title, description }) => {
  const [comment, setComment] = useState("");
  useLogComment(comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your comment: "${comment}" have already added successfully!`);
    setComment("");
  };

  return (
    <CommentContext.Provider value={comment}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="comment">Your comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit">Add comment</button>
        </form>
      </div>
    </CommentContext.Provider>
  );
};

export default ProductPage;