import React from 'react';
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker as GoogleMarker, InfoWindow } from '@react-google-maps/api';
import { options, center, containerStyle as mapStyle } from "./settings";
import MarkerForm from '../markerForm/MarkerForm';
import { Marker } from "../../utils/marker";
import { style } from './style';
import MarkerInfo from '../markerInfo/MarkerInfo';
import Friends from '../friends/friends';
import "./map.css";
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
    const [filteredMarkers, setFilteredMarkers] = useState<Marker[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [friendsOpen, setFriendsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const clickedMarker: Marker = {
            name: '',
            description: '',
            image: '',
            reviews: [''],
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
                ratings: markerData.ratings,
                category: markerData.category
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

    const handleCloseForm = () => {
        setMarker(null);
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);

    };

    const handleFilters = () => {

        setFilteredMarkers(selectedCategories.length > 0
            ? markers.filter(marker => selectedCategories.includes(marker.category))
            : markers);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setFilteredMarkers(markers);
    };


    const handleAddReview = (review: string,rating:number): Marker | void => {
        
        
        if (selectedMarker) {
            
            const newrate = selectedMarker.ratings === 0? rating:(selectedMarker.ratings+rating)/2;
            const updatedMarker: Marker = {
                ...selectedMarker,
                reviews: [...selectedMarker.reviews, review],
                ratings:newrate
            };

            markers[markers.indexOf(selectedMarker)] = updatedMarker;
            
            setMarker(updatedMarker);
            console.log(markers);
            return updatedMarker;
        }

    };

    const logout = () => {
    };

    const handleFilterToggle = () => {
        setFilterOpen(!filterOpen);
    };

    const handleFriendsToggle = () => {
        setFriendsOpen(!friendsOpen);
    };

    const handleProfileToggle = () => {
        setProfileOpen(!profileOpen);
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyAm4-Y9DXFycCPlBGSfENndiTKtmBKz-GQ">

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
                    {selectedMarker && (
                        <InfoWindow
                            position={selectedMarker.position}
                            onCloseClick={handleCloseInfoWindow}
                        >
                            <MarkerInfo
                                marker={selectedMarker}
                                onAddReview={handleAddReview}
                            />
                        </InfoWindow>
                    )}
                    {marker && (
                        <InfoWindow
                            position={marker.position}
                            onCloseClick={handleCloseForm}>
                            <MarkerForm
                                onSubmit={handleMarkerFormSubmit}
                                onCancel={handleMarkerFormCancel}
                                initialMarker={marker}
                            />
                        </InfoWindow>
                    )}


                    {/* FILTERS POPUP */}
                    {filterOpen && (
                        <div className="floating-div filter-div">
                            <h3 className="filter-title">Filter</h3>
                            <div className="filter-select-wrapper">
                                <select className="filter-select" multiple value={selectedCategories} onChange={handleCategoryChange}>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Park">Park</option>
                                    <option value="Pub">Pub</option>
                                    <option value="Museum">Museum</option>
                                    <option value="Shop">Shop</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="filter-select-icon">&#9662;</div>
                            </div>
                            <div className="filter-button-group">
                                <button className="filter-button" onClick={handleFilters}>
                                    Apply
                                </button>
                                <button className="filter-button" onClick={clearFilters}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}




                    {/* FRIENDS POPUP */}
                    {friendsOpen && (<div className="floating-div friends-div"
                        
                    >
                        <Friends />
                    </div>)}

                    {profileOpen && (
                        <div className="floating-div profile-div"
                            style={{
                                position: 'absolute',
                                top: 50,
                                left: 10,
                                background: '#fff',
                                padding: 10,
                                zIndex: 1,
                            }}
                        >
                            <h3>Profile</h3>
                            <p>Name: John Doe</p>
                            <p>Email: johndoe@example.com</p>
                            <p>Location: New York City</p>

                            <div>
                                <p>Levels: 5</p>
                                <progress className="progress-bar" max="10" value="5"></progress>
                            </div>
                        </div>
                    )}

                    <button
                        className='button'
                        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
                        onClick={handleFilterToggle}
                    >
                        {filterOpen ? 'Close Filter' : 'Open Filter'}
                    </button>
                    <button
                        className='button'
                        style={{ position: 'absolute', top: 10, left: 100, zIndex: 1 }}
                        onClick={handleFriendsToggle}>{friendsOpen ? 'Close Friends' : 'Open Friends'}</button>
                    <button
                        className='button'
                        style={{ position: 'absolute', top: 10, left: 205, zIndex: 1 }}
                        onClick={handleProfileToggle}
                    >
                        {profileOpen ? 'Close Profile' : 'Open Profile'}
                    </button>
                    <button
                        className='button'
                        style={{ position: 'absolute', top: 10, left: 302, zIndex: 1 }}
                        onClick={logout}
                    >
                        Logout
                    </button>
                </GoogleMap>

            </div>

        </LoadScript>
    );
};

export default GoogleMapComponent;
