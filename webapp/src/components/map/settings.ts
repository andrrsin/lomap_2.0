import mapStyles from './style';

export const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Center on Kalmar
export const center = {
  lat: 56.68,
  lng: 16.33
};

// Disable default UI
export const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};