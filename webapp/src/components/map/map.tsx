import { GoogleMap, Marker, InfoWindow,useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import { containerStyle, options,center } from './settings';
require('dotenv').config();
export const Map = () => {
const {isLoaded} = useJsApiLoader({id: 'google-map-script', googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string})
//save map in ref
const mapRef = React.useRef<google.maps.Map | null>(null);
    const onLoad = (map: google.maps.Map): void => { mapRef.current = map };
const unMount = ():void => {mapRef.current = null};

console.log(process.env.GOOGLE_MAPS_API_KEY);
if(!isLoaded) return <div>Loading...</div>;
return (
    
    <div className="mapWrapper">
        <GoogleMap mapContainerStyle={containerStyle} options={options as google.maps.MapOptions} center = {center} zoom={12} onLoad={onLoad} onUnmount={unMount}/>
    </div>
);

}

export default Map;