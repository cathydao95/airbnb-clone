import { urlFor } from "./../client";
function Review({ review }) {
  return (
    <div className="review-box">
      <h1>{review.rating}</h1>

      <h2>{review.traveler.name}</h2>
      <img src={urlFor(review.traveler.image)} />
    </div>
  );
}

export default Review;
