import React from 'react';
import {Marker} from"../../utils/marker";

export default function MarkerInfo(props: {marker: Marker}): JSX.Element {
    const { marker} = props;
    
    
    return (
        <div>
        <h2>{marker.name}</h2>
        <p>{marker.description}</p>
        <img src={marker.image} alt={marker.name} />
        <p>{marker.reviews}</p>
        <p>{marker.ratings}</p>
       
        </div>
    );
    }