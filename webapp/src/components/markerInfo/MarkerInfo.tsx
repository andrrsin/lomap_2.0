import React from 'react';
import { Marker } from "../../utils/marker";
import { useState } from "react";

interface MarkerInfoProps {
    marker: Marker;
    onAddReview: (review: string,rating:number) => Marker|void;
  }

export default function MarkerInfo(props: MarkerInfoProps): JSX.Element {
    const { marker, onAddReview } = props;

    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [currentMarker,setMarker] = useState<Marker>(marker);
    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewReview(event.target.value);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 
            const rating = parseInt(event.target.value);
            setNewRating(rating);
          
          
    };

    const handleAddReview = () => {
        if (newReview) {
           
            const updatedMarker = onAddReview(newReview,newRating);
            setMarker(updatedMarker?updatedMarker:currentMarker);
            setNewReview('');
        }
    };
    return (
        <div>
            <h2>{currentMarker.name}</h2>
            <p>{currentMarker.description}</p>
            <img src={currentMarker.image} alt={currentMarker.name} />
            <p>Reviews: {currentMarker.reviews}</p>
            <p>Ratings: {currentMarker.ratings}</p>
            <p>Category: {currentMarker.category}</p>
            <div>
                <input type="text" value={newReview} onChange={handleReviewChange} required/>
                <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <label key={star}>
          <input
            type="radio"
            name="rating"
            value={star}
            checked={newRating === star}
            onChange={handleRatingChange}
          required/>
          <span className="star"></span>
        </label>
      ))}
    </div>
                <button onClick={handleAddReview}>Add Review</button>
            </div>

        </div>
    );
}