import React, { useState } from 'react';
import { Marker } from '../../utils/marker';

interface MarkerFormProps {
    onSubmit: (marker: Marker) => void;
    onCancel: () => void; // New prop for cancel action
    initialMarker: Marker; // New prop to prefill form with existing marker data
}



const MarkerForm: React.FC<MarkerFormProps> = ({ onSubmit, onCancel, initialMarker }) => {
    const [marker, setMarker] = useState<Marker>(initialMarker);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setMarker(prevMarker => ({ ...prevMarker, [name]: value }));
    };

   

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(marker.category===''){
            marker.category='Other';
        }
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
                <textarea name="description" value={marker.description} onChange={handleChange} />
            </label>
            <br />
            <label>
                Image:
                <input type="text" name="image" value={marker.image} onChange={handleChange} />
            </label>
            <br />
        
            
      

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" defaultValue="Other" onChange={handleChange}>
                {/* Tengo que arreglar onChange */}
                
                <option value="Restaurant">Restaurant</option>
                <option value="Park">Park</option>
                <option value="Pub">Pub</option>
                <option value="Museum">Museum</option>
                <option value="Shop">Shop</option>
                <option value="Other">Other</option>
            </select>
            <br />
            <button type="submit">Add Marker</button>
            {/* <button type="button" onClick={handleCancel}>Cancel</button>  */}
        </form>
    );
};

export default MarkerForm;