import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import { containerStyle, options, center } from './settings';
import { useEffect } from 'react';

export const Map = () => {
    const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: "AIzaSyAm4-Y9DXFycCPlBGSfENndiTKtmBKz-GQ" })
    //save map in ref
    const mapRef = React.useRef<google.maps.Map>(new google.maps.Map(document.createElement('div')));
    const onLoad = (map: google.maps.Map): void => { mapRef.current = map };
    const unMount = (): void => { mapRef.current = new google.maps.Map(document.createElement('div')) };
    const [origin,setOrigin] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    useEffect(() => {
        // get the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setOrigin({ lat: latitude, lng: longitude });
            });
        }else{
            setOrigin(center);
        }
    }, []);
    
    let markerOptions= {
        position:new google.maps.LatLng(origin.lat,origin.lng),
        map:mapRef.current,
    }
    let marker = new google.maps.Marker(markerOptions);
    marker.addListener("click", (e:google.maps.MapMouseEvent) => {
        mapRef.current.setZoom(8);
        mapRef.current.setCenter(marker.getPosition() as google.maps.LatLng);
      });
    mapRef.current.addListener("click", (e:google.maps.MapMouseEvent) => {
        document.getElementById("lat")!.innerHTML = e.latLng?.lat().toString()||"";
      });
      
    if (!isLoaded) return <div>Loading...</div>;
    return (

        <div className="mapWrapper">
            <GoogleMap mapContainerStyle={containerStyle} options={options as google.maps.MapOptions} center={origin} zoom={13} onLoad={onLoad} onUnmount={unMount} />
            <div className="lat">

            </div>
        </div>
    );

}

export default Map;