import React from 'react';
import { Marker } from "../../utils/marker";
import { useState } from "react";

interface MarkerInfoProps {
    marker: Marker;
    onAddReview: (review: string) => Marker|void;
  }

export default function MarkerInfo(props: MarkerInfoProps): JSX.Element {
    const { marker, onAddReview } = props;

    const [newReview, setNewReview] = useState('');
    const [currentMarker,setMarker] = useState<Marker>(marker);
    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewReview(event.target.value);
    };

    const handleAddReview = () => {
        if (newReview) {
           
            const updatedMarker = onAddReview(newReview);
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
                <input type="text" value={newReview} onChange={handleReviewChange} />
                <button onClick={handleAddReview}>Add Review</button>
            </div>
        </div>
    );
}