import React from 'react';
import { Marker } from "../../utils/marker";
import { useState } from "react";
import './MarkerInfo.css';
interface MarkerInfoProps {
  marker: Marker;
  onAddReview: (review: string, rating: number) => Marker | void;
}

export default function MarkerInfo(props: MarkerInfoProps): JSX.Element {
  const { marker, onAddReview } = props;

  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [currentMarker, setMarker] = useState<Marker>(marker);
  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const rating = parseInt(event.target.value);
    setNewRating(rating);


  };

  const handleAddReview = () => {
    if (newReview) {

      const updatedMarker = onAddReview(newReview, newRating);
      setMarker(updatedMarker ? updatedMarker : currentMarker);
      setNewReview('');
    }
  };
  return (
    <div className="marker-details">
      <h2>{currentMarker.name}</h2>
      <p>{currentMarker.description}</p>
      {currentMarker.image === "" ? "" : <img src={currentMarker.image} />}
      <p>Reviews:</p>
      <div className='reviewsWrapper'>
        {currentMarker.reviews.map((review, index) => (
          <div key={index} className='review'>{review}</div>
        ))}
      </div>
      <p>Ratings:</p><div className='info'>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star2 ${currentMarker.ratings >= star ? 'filled' : ''}`}
          ></span>
        ))}
      </div>
      <p>Category: </p><div className='info'>{currentMarker.category}</div>
      <div className="review-section">
        <p>Add a Review:</p>
        <input type="text" value={newReview} onChange={handleReviewChange} />
        <div className="rating-section">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                name="rating"
                value={star}
                checked={newRating === star}
                onChange={handleRatingChange}
              />
              <span className="star"></span>
            </label>
          ))}
        </div>
        <button className='button2' onClick={handleAddReview}>Add Review</button>
      </div>
    </div>

  );
}