Feature: Adding a review

Scenario: A logged in user adds a review
  Given The user logs in and clicks a marker
  And fills the form of review
  Then ratings and review is added