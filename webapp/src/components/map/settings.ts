import {style} from './style';

export const containerStyle = {
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 300px', // Adjust the width of the form as needed
  gap: '20px'
};

// Center on Kalmar
export const center = {
  lat: 50.8465,
  lng: 4.3521
};

// Disable default UI
export const options = {
  styles: style,
  disableDefaultUI: true,
  zoomControl: true
};