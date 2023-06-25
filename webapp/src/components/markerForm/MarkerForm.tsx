import React, { useState } from 'react';
import { Marker } from '../../utils/marker';

interface MarkerFormProps {
  onSubmit: (marker: Marker) => void;
  onCancel: () => void; // New prop for cancel action
  initialMarker: Marker; // New prop to prefill form with existing marker data
}



const MarkerForm: React.FC<MarkerFormProps> = ({ onSubmit, onCancel, initialMarker }) => {
  const [marker, setMarker] = useState<Marker>(initialMarker);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMarker(prevMarker => ({ ...prevMarker, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(marker);
    setMarker(initialMarker);
  };

  const handleCancel = () => {
    onCancel(); // Call the onCancel callback provided by the parent component
    setMarker(initialMarker);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={marker.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={marker.description} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Image:
        <input type="text" name="image" value={marker.image} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Reviews:
        <textarea name="reviews" value={marker.reviews} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Ratings:
        <input
          type="number"
          name="ratings"
          value={marker.ratings}
          onChange={handleChange}
          required
          min={0}
          max={5}
        />
      </label>
      <br />
      <button type="submit">Add Marker</button>
      <button type="button" onClick={handleCancel}>Cancel</button> {/* Cancel button */}
    </form>
  );
};

export default MarkerForm;