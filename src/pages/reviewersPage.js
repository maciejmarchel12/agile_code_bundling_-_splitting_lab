import React, { useEffect, useState, lazy, Suspense } from "react";
import { useQuery } from "react-query";
import { getMovieReviews } from "../api";
const MovieReview = lazy(() => import( "../components/movieReview"));
import { useParams } from "react-router-dom";

const MovieReviewers = (props) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(undefined);
  console.log(selectedReview);
  useEffect(() => {
    getMovieReviews(id).then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  const reviewsAuthors = reviews.map((r, index) => {
    return (
      <Suspense fallback={<h1>Building list</h1>}>
      <li key={r.author}>
        <button
          className="listbutton"
          onClick={(event) => setSelectedReview(index)}
        >
          {r.author}
        </button>
      </li>
      </Suspense>
    );
  });
  return (
    <>
      <h1>Movie Reviewers</h1>
      <ul>{reviewsAuthors}</ul>
      {selectedReview !== undefined ? (
        <MovieReview review={reviews[selectedReview]} />
      ) : null}
    </>
  );
};

export default MovieReviewers;
