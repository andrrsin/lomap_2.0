import React, { useState, useEffect } from 'react';
import './App.css';
import GoogleMapComponent from './components/map/map';
import {   createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';

function App(): JSX.Element {

  const ProtectedRoute = ({children}:any) => {
    //Descomentar cuando funcione el inicio de sesión
    // console.log(session.info);
    // if (!session.info.isLoggedIn) {
    //  return <Navigate to="/login" />;
    // }
    console.log("ProtectedRoute");
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",

      element: (
        <ProtectedRoute>
      <GoogleMapComponent />
      </ProtectedRoute>),
    },
    {
      path: "/login",
      element: <Login />,
    }
  ]);
  return (
    <RouterProvider router={router} />
   
  );
}

export default App;