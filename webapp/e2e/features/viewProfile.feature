Feature: View a profile

Scenario: A user views his profile
  Given The user logs in
  And goes to show profile
  Then the profile is shown