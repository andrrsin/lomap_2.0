import React from 'react';
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker as GoogleMarker, InfoWindow } from '@react-google-maps/api';
import { options, center, containerStyle as mapStyle } from "./settings";
import MarkerForm from '../markerForm/MarkerForm';
import { Marker } from "../../utils/marker";
import { style } from './style';
import MarkerInfo from '../markerInfo/MarkerInfo';

// lat: event.latLng?.lat()?event.latLng?.lat():0,
// lng: event.latLng?.lng()?event.latLng?.lng():0

const containerStyle = {
    width: '100%',
    height: '400px'
};

const GoogleMapComponent: React.FC = () => {
    const [marker, setMarker] = useState<Marker | null>(null);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const clickedMarker: Marker = {
            name: '',
            description: '',
            image: '',
            reviews: '',
            ratings: 0,
            category: '',
            position: {
                lat: event.latLng?.lat() ? event.latLng?.lat() : 0,
                lng: event.latLng?.lng() ? event.latLng?.lng() : 0
            }
        };
        setMarker(clickedMarker);
    };

    const handleMarkerFormSubmit = (markerData: Marker) => {
        if (marker) {
            const updatedMarker: Marker = {
                ...marker,
                name: markerData.name,
                description: markerData.description,
                image: markerData.image,
                reviews: markerData.reviews,
                ratings: markerData.ratings
            };
            setMarkers(prevMarkers => [...prevMarkers, updatedMarker]);
        }
        setMarker(null);
    };
    const handleMarkerFormCancel = () => {
        setMarker(null);
    };

    const handleMarkerClick = (marker: Marker) => {
        setSelectedMarker(marker);
    };

    const handleCloseInfoWindow = () => {
        setSelectedMarker(null);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);
    };

    const filteredMarkers = selectedCategories.length > 0
        ? markers.filter(marker => selectedCategories.includes(marker.category))
        : markers;
    return (
        <LoadScript googleMapsApiKey="AIzaSyAm4-Y9DXFycCPlBGSfENndiTKtmBKz-GQ">
            <div>
                <div>
                    <select multiple value={selectedCategories} onChange={handleCategoryChange}>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Park">Park</option>
                        <option value="Pub">Pub</option>
                        <option value="Museum">Museum</option>
                        <option value="Shop">Shop</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div style={containerStyle}>
                    <GoogleMap
                        mapContainerStyle={mapStyle}
                        center={center}
                        zoom={10}
                        options={options}
                        onClick={handleMapClick}
                    >
                        {marker && <GoogleMarker position={marker.position} />}
                        {filteredMarkers.map(marker => (
                            <GoogleMarker
                                key={marker.position.lat + marker.position.lng}
                                position={marker.position}
                                onClick={() => handleMarkerClick(marker)}
                            />
                        ))}
                        { selectedMarker && (
                                <InfoWindow
                                    position={selectedMarker.position}
                                    onCloseClick={handleCloseInfoWindow}
                                >
                                    <MarkerInfo
                                        marker={selectedMarker}
                                    />
                                </InfoWindow>
                            )}
                    </GoogleMap>
                    {marker && (
                        <MarkerForm
                            onSubmit={handleMarkerFormSubmit}
                            onCancel={handleMarkerFormCancel}
                            initialMarker={marker}
                        />
                    )}
                </div>
            </div>
        </LoadScript>
    );
};

export default GoogleMapComponent;
