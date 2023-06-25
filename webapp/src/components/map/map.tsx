import React from 'react';
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker as GoogleMarker, InfoWindow} from '@react-google-maps/api';
import {options, center,containerStyle} from "./settings";
import MarkerForm  from '../markerForm/MarkerForm';
import {Marker} from"../../utils/marker";
import { style } from './style';
import MarkerInfo from '../markerInfo/MarkerInfo';

// lat: event.latLng?.lat()?event.latLng?.lat():0,
// lng: event.latLng?.lng()?event.latLng?.lng():0
const GoogleMapComponent: React.FC = () => {
    const [marker, setMarker] = useState<Marker | null>(null);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      const clickedMarker: Marker = {
        name: '',
        description: '',
        image: '',
        reviews: '',
        ratings: 0,
        position: {
            lat: event.latLng?.lat()?event.latLng?.lat():0,
          lng: event.latLng?.lng()?event.latLng?.lng():0
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
  return (
    <LoadScript googleMapsApiKey="AIzaSyAm4-Y9DXFycCPlBGSfENndiTKtmBKz-GQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
        onClick={handleMapClick}
      >
       {marker && <GoogleMarker position={marker.position} />}
        {markers.map(markerData => (
          <GoogleMarker
            key={`${markerData.position.lat}-${markerData.position.lng}`}
            position={markerData.position}
            onClick={() => handleMarkerClick(markerData)}
          />
        ))}
        {selectedMarker && (
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

    </LoadScript>
  );
};

export default GoogleMapComponent;
