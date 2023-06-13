import mapStyles from './style';

export const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Center on Kalmar
export const center = {
  lat: 50.8465,
  lng: 4.3521
};

// Disable default UI
export const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};