// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import GoogleMapComponent from '../components/map/map';


// describe('GoogleMapComponent', () => {
//   const sessionMock = {
//     session: {
//       info: {
//         webId: 'https://example.com/profile#me',
//         isLoggedIn: true,
//       },
//       logout: jest.fn(),
//     },
//   };

//   beforeEach(() => {
//     let useSession = jest.requireMock('@inrupt/solid-ui-react').useSession;
//     let getLocations = jest.requireMock('../utils/solid').getLocations;
//     let getFriendsID = jest.requireMock('../utils/solid').getFriendsID;
//     let createLocation = jest.requireMock('../utils/solid').createLocation;
//     let deleteLocation = jest.requireMock('../utils/solid').deleteLocation;

//     useSession.mockReturnValue(sessionMock);
//     getLocations.mockResolvedValue([]);
//     getFriendsID.mockResolvedValue([]);
//     createLocation.mockResolvedValue({});
//     deleteLocation.mockResolvedValue({});
//   });

//   test('renders the map', () => {
//     render(<GoogleMapComponent />);
//     const mapElement = screen.getByTestId('google-map');
//     expect(mapElement).toBeInTheDocument();
//   });

//   test('adds a new marker on map click', async () => {
//     render(<GoogleMapComponent />);
//     const mapElement = screen.getByTestId('google-map');
//     userEvent.click(mapElement);

//     await waitFor(() => {
//       const marker = screen.getByTestId('marker');
//       expect(marker).toBeInTheDocument();
//     });
//   });

//   test('displays marker info on marker click', async () => {
//     const markerData = {
//       url: 'https://example.com/profile#me',
//       name: 'Marker 1',
//       description: 'Marker description',
//       image: 'marker-image.jpg',
//       reviews: [],
//       ratings: 0,
//       category: 'Restaurant',
//       position: {
//         lat: 1,
//         lng: 1,
//       },
//     };
//     let getLocations = jest.requireMock('../utils/solid').getLocations;
//     getLocations.mockResolvedValue([markerData]);

//     render(<GoogleMapComponent />);
//     const markerElement = screen.getByTestId('marker');
//     userEvent.click(markerElement);

//     await waitFor(() => {
//       const markerInfo = screen.getByTestId('marker-info');
//       expect(markerInfo).toBeInTheDocument();
//     });
//   });

//   test('logs out when Logout button is clicked', () => {
//     render(<GoogleMapComponent />);
//     const logoutButton = screen.getByText('Logout');
//     userEvent.click(logoutButton);

//     expect(sessionMock.session.logout).toHaveBeenCalled();
//   });

//   // You can add more tests for other functionalities as needed

// });
