 Feature: Adding a new marker

Scenario: A logged user creates a marker
  Given A logged in user clicks in the map and the infowindow is shown
  When  The form is filled and add is pressed
  Then the markers should reload and appear the new one