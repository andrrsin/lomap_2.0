import React from 'react';
import { Marker } from "../../utils/marker";
import { useState } from "react";
import './MarkerInfo.css';

import { useSession } from '@inrupt/solid-ui-react';
interface MarkerInfoProps {
  marker: Marker;
  onAddReview: (review: string, rating: number) => void;
  onDelete: (marker: Marker) => void;
}

export default function MarkerInfo(props: MarkerInfoProps): JSX.Element {
  const { marker, onAddReview,onDelete } = props;
  const {session} = useSession();
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [currentMarker] = useState<Marker>(marker);
  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const rating = parseInt(event.target.value);
    setNewRating(rating);
    console.log(marker.url)
    console.log(session.info)

  };



  const handleAddReview = () => {
    if (newReview) {

      onAddReview(newReview, newRating);

      setNewReview('');
    }
  };

  
  return (
    <div className="marker-details">
      {(marker.url?marker.url:"").split(".")[0] === (session.info.webId?session.info.webId:"").split(".")[0]? <button data-testid="delete" className='button3' onClick={() => onDelete(currentMarker)}>Delete</button> : ""}
      <h2>{currentMarker.name}</h2>
      <p>{currentMarker.description}</p>
      <img src={currentMarker.image} alt ="" />
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
        <input data-testid="input" type="text" value={newReview} onChange={handleReviewChange} />
        <div className="rating-section">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input data-testid="rating"
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
        <button data-testid="submit" className='button2' onClick={handleAddReview}>Add Review</button>
      </div>
    </div>

  );
}