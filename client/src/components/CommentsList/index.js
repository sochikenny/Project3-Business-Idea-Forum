import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { LOADING, ADD_COMMENT } from "../../utils/actions";
import API from "../../utils/API";

function CommentsList({ postId, comments }) {
  const [state, dispatch] = useStoreContext();

  const getComments = () => {
    dispatch({ type: LOADING });
    API.getComments()
      .then((results) => {
        dispatch({
          postId,
          type: ADD_COMMENT,
          comments: results.data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getComments();
  }, []);
  //  console.log(state)
  return (
    <div>
      <h2>Comments:</h2>
      <section>
        {state.currentPost.comments &&
          state.currentPost.comments.map((comment) => (
            <li
              className="list"
              style={{
                listStyleType: "none",
                border: "1px solid #dedede",
                padding: "10px",
                margin: "20px 0",
                position: "relative",
                justifyContent: "space-between",
                borderRadius: "20px",
                lineHeight: "1.8rem",
              }}
            >
              {comment.body}
            </li>
          ))}
      </section>
    </div>
  );
}

export default CommentsList;
