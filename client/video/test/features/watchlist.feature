Feature: Watchlist
  Users should be able to add video's to their watchlist
  It should be possible to add a video to the watchlist via the card menu
  It should be possible to remove a video from the watchlist via the card watchlist remove button
  It should be possible to remove a video from the watchlist via the card menu
  It should be possible to add a video to the watchlist via the `add to watchlist` button on the video page
  It should be possible to remove a video from the watchlist via the `remove from watchlist` button on the video page
  It should be possible to watch a video from the watchlist

  @desktop @tablet @mobile
  Scenario: Save video to watchlist via the card menu
    Given I go to the "index" page
    And I wait until the page has been loaded
    When I click on the card menu button of the first card
    And I click on the add to watchlist button in the card menu
    Then the card menu should show a remove from watchlist button
    And there should be 1 video in the watchlist

  @desktop @tablet @mobile
  Scenario: Remove video from watchlist via the card menu
    Given I am still on the "index" page
    When I click on the remove from watchlist button in the card menu
    Then the card menu should show an add to watchlist button

  @desktop @tablet @mobile
  Scenario: There should be a remove from watchlist button visible in the card top left corner
    Given I am still on the "index" page
    When I click on the add to watchlist button in the card menu
    And I click on the close button in the card menu
    Then the remove from watchlist button should be visible in the card

  @desktop @tablet @mobile
  Scenario: Remove video from watchlist via the card remove from watchlist button
    Given I am still on the "index" page
    When I click on the remove from watchlist button in the card
    Then the watchlist should be hidden

  @desktop @tablet @mobile
  Scenario: Add video to watchlist via the add to watchlist button on the video page
    Given I go to the "/video/WXu7kuaW/DqGECHhT" page
    And I wait until the page has been loaded
    When I click on the add to watchlist button on the video page
    And wait for 1 seconds
    Then the remove from watchlist button should be visible on the video page

  @desktop @tablet @mobile
  Scenario: Remove video from watchlist via the remove from watchlist button on the video page
    Given I am still on the "/video/WXu7kuaW/DqGECHhT" page
    When I click on the remove from watchlist button on the video page
    And wait for 1 seconds
    Then the add to watchlist button should be visible on the video page

  @desktop @tablet @mobile
  Scenario: Watch video from the watchlist in the index page
    Given I have the following saved watchlist:
      | mediaid  | feedid   |
      | LjBvF1FX | lrYLc95e |
      | Iyfst4Se | lrYLc95e |
    And I go to the "index" page
    And I wait until the page has been loaded
    When I click on the first card in the watchlist slider
    Then I should navigate to the "/video/watchlist/Iyfst4Se" page

  @desktop @tablet @mobile
  Scenario: Slider below video should show remaining video's in watchlist
    Given I am still on the "/video/watchlist/Iyfst4Se" page
    When I do nothing
    Then I should see the watchlist below the video
    And there should be 1 video in the watchlist below the video