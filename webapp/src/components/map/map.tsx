import React, { useEffect } from 'react';
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker as GoogleMarker, InfoWindow } from '@react-google-maps/api';
import { options, center, containerStyle as mapStyle } from "./settings";
import MarkerForm from '../markerForm/MarkerForm';
import { Marker } from "../../utils/marker";
import { deleteLocation } from "../../utils/solid";
import MarkerInfo from '../markerInfo/MarkerInfo';
import Friends from '../friends/friends';
import "./map.css";
import { useSession } from "@inrupt/solid-ui-react";
import Tooltip from "@mui/material/Tooltip"
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Profile from '../profile/Profile';
import { createLocation } from "../../utils/solid";
import { getLocations, getFriendsID } from "../../utils/solid";
import { addLocationReview } from "../../utils/solid";

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
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["Restaurant", "Park", "Pub", "Museum", "Shop", "Other"]);
    const [filteredMarkers, setFilteredMarkers] = useState<Marker[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [profileOpen, setProfileOpen] = useState(false);

    //SOLID INTEGRATION
    const { session } = useSession();

    const navigate = useNavigate();

    React.useEffect(() => {
        loadLocations();
        async function loadLocations() {
            try {
                setLoading(true); // Start loading
    
                if (session.info.webId) {
                    // let locations = await getLocations(session.info.webId) as Marker[];
                    let locations:Marker[] = [];
         
                    let friends = await getFriendsID(session.info.webId);
    
                    for (let friend of friends) {
                        let friendLocations = await getLocations(friend) as Marker[];
                 
                        locations = locations.concat(friendLocations);
                      
                    }
                    setMarkers(locations);
                    setFilteredMarkers(locations);
                    console.log(locations);
                }
            } catch (error) {
                console.log('Error loading locations:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
    }, [session.info.webId]);



    

    useEffect(() => {

        handleRedirectAfterLogin();
        async function handleRedirectAfterLogin() {
            await session.handleIncomingRedirect(window.location.href);
            if (!session.info.isLoggedIn) {
                navigate("/login"); //desactivar when testing
            }
    
        }
    }, [navigate,session]);

    


    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const clickedMarker: Marker = {
            url: session.info.webId,
            name: '',
            description: '',
            image: '',
            reviews: [],
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
        if (marker && session.info.webId) {

            const updatedMarker: Marker = {
                ...marker,
                url: session.info.webId,
                name: markerData.name,
                description: markerData.description,
                image: markerData.image,
                reviews: markerData.reviews,
                ratings: markerData.ratings,
                category: markerData.category,
                imagesAsFile: markerData.imagesAsFile
            };
            setMarkers(prevMarkers => [...prevMarkers, updatedMarker]);
            createLocation(session.info.webId, updatedMarker);
        }
        setMarker(null);
        setSelectedCategories([]);
        handleFilters();
    };
    const handleMarkerFormCancel = () => {
        setMarker(null);
    };

    const handleMarkerClick = (marker: Marker) => {
        setSelectedMarker(marker);
    };

    const handleCloseInfoWindow = () => {
        setSelectedMarker(null);
        const temp = filteredMarkers;
        setFilteredMarkers([]);
        setFilteredMarkers(temp);
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

    const clearFilters = async () => {
        setSelectedCategories([]);
        try {
            setLoading(true); // Start loading

            if (session.info.webId) {
                // let locations = await getLocations(session.info.webId) as Marker[];
                let locations:Marker[] = [];
                
                let friends = await getFriendsID(session.info.webId);

                for (let friend of friends) {
                    let friendLocations = await getLocations(friend) as Marker[];

                    locations = locations.concat(friendLocations);

                }

                setFilteredMarkers(locations);
                console.log(locations);
            }
        } catch (error) {
            console.log('Error loading locations:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };


    const handleAddReview = async (review: string, rating: number) => {
        if (selectedMarker) {
            

            const updatedRatings =
                (selectedMarker.ratings * selectedMarker.reviews.length + rating) /
                (selectedMarker.reviews.length + 1);
            await addLocationReview(selectedMarker, review, updatedRatings);
            await clearFilters();
            setSelectedMarker(null);
        }
    };


    const logout = () => {
        session.logout();
        navigate("/login");

    };

    const handleDelete = async (marker: Marker) => {
        if (session.info.webId){
            await deleteLocation(session.info.webId,marker.url as string);
            await clearFilters();
            setSelectedMarker(null);
        }
        
    }

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
                        marker.url!.split(".")[0] === session.info.webId!.split(".")[0] ?
                        (<GoogleMarker
                            key={marker.position.lat.toString() + marker.position.lng.toString()}
                            position={new google.maps.LatLng(marker.position.lat, marker.position.lng)}
                            onClick={() => handleMarkerClick(marker)}
                            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png" }}
                        />):
                            (<GoogleMarker
                                key={marker.position.lat.toString() + marker.position.lng.toString()+new Date().getTime()}
                                position={new google.maps.LatLng(marker.position.lat, marker.position.lng)}
                                onClick={() => handleMarkerClick(marker)}
                                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                            />) 

                    ))}
                    {selectedMarker && (
                        <InfoWindow
                            position={new google.maps.LatLng(selectedMarker.position.lat, selectedMarker.position.lng)}
                            onCloseClick={handleCloseInfoWindow}
                        >
                            <MarkerInfo
                                marker={selectedMarker}
                                onAddReview={handleAddReview}
                                onDelete={handleDelete}
                            />
                        </InfoWindow>
                    )}
                    {marker && (
                        <InfoWindow
                            position={new google.maps.LatLng(marker.position.lat, marker.position.lng)}
                            onCloseClick={handleCloseForm}>
                            <MarkerForm
                                onSubmit={handleMarkerFormSubmit}
                                onCancel={handleMarkerFormCancel}
                                initialMarker={marker}
                            />
                        </InfoWindow>
                    )}

                    {loading && (
                        <div className="floating-div loading-div" style={{ position: 'absolute', top: 10, left: 250, zIndex: 1 }}>
                            <p>Loading markers...</p>
                        </div>
                    )}
                    {/* FILTERS POPUP */}

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





                    {/* FRIENDS POPUP */}
                    <div className="floating-div friends-div">
                        <Friends />
                    </div>

                    {profileOpen && <Profile />}


                    <button
                        className='button'
                        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
                        onClick={handleProfileToggle}
                    >
                        {profileOpen ? 'Close Profile' : 'Open Profile'}
                    </button>
                    <button
                        className='button'
                        style={{ position: 'absolute', top: 10, left: 105, zIndex: 1 }}
                        onClick={logout}
                    >
                        Logout
                    </button>
                    <Tooltip leaveDelay={200} enterDelay={200}
                        title="1. Click on the map to create a marker
                    2. Click on a marker to read info and make reviews
                    3. You can add friends and filter with the right bar
                    4. You can see your current level on the profile"

                    >
                        <button
                            className='button'
                            style={{ position: 'absolute', top: 10, left: 170, zIndex: 1, height: 31 }}

                        >

                            <HelpOutlineOutlinedIcon /> {/* Use the FaQuestion icon from react-icons */}

                        </button>
                    </Tooltip>
                    {/* Define the tooltip with the same identifier */}

                </GoogleMap>

            </div>

        </LoadScript>
    );
};

export default GoogleMapComponent;
