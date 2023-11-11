import React from "react";

const MovieReview = (props) => {
  return (
    <>
      <h2>Full Review </h2>
      <pre>{JSON.stringify(props.review, null, 2)}</pre>;
    </>
  );
};

export default MovieReview 