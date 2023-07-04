import React, { useState } from 'react';
import { Marker } from '../../utils/marker';
import './markerForm.css';
interface MarkerFormProps {
    onSubmit: (marker: Marker) => void;
    onCancel: () => void; // New prop for cancel action
    initialMarker: Marker; // New prop to prefill form with existing marker data
}



const MarkerForm: React.FC<MarkerFormProps> = ({ onSubmit, onCancel, initialMarker }) => {
    const [marker, setMarker] = useState<Marker>(initialMarker);


    const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      handleChange(e);
    }
  };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setMarker(prevMarker => ({ ...prevMarker, [name]: value }));
    };



    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (marker.category === '') {
            marker.category = 'Other';
        }
        onSubmit(marker);
        setMarker(initialMarker);
    };

 
    return (
        <form onSubmit={handleSubmit} className="form">
            <label className='form-label'>
                Name:
                <input className='form-input' type="text" name="name" value={marker.name} onChange={handleChange} required />
            </label>
            <br />
            <label className='form-label'>
                Description:
                <textarea className="form-textarea" name="description" value={marker.description} onChange={handleChange} />
            </label>
            <br />
            <label className='form-label'>
                Image:
                <input className='form-file' accept=".jpg, .png" type="file" name="image" value={marker.image} onChange={handleImageChange } />
                {selectedImage && (
                    <div className="image-preview">
                        <img src={selectedImage} alt="Preview" />
                    </div>
                )}
            </label>
            <br />
            <label className='form-label' htmlFor="category">Category:</label>
            <select className="form-select" id="category" name="category" defaultValue="Other" onChange={handleChange}>
                <option value="Restaurant">Restaurant</option>
                <option value="Park">Park</option>
                <option value="Pub">Pub</option>
                <option value="Museum">Museum</option>
                <option value="Shop">Shop</option>
                <option value="Other">Other</option>
            </select>
            <br />
            <button className="form-button" type="submit">Add Marker</button>
        </form>
    );
};

export default MarkerForm;