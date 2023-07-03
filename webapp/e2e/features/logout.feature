Scenario: A user logs out
  Given The user logs in
  When Clicks logout
  Then The login window is shown