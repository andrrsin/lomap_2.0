Feature: View a profile

Scenario: A user views his profile
  Given The user logs in
  When Clicks to show profile
  Then The profile is shown