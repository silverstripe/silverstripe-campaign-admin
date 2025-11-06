@javascript @retry
Feature: Manage campaigns
  As a cms author
  I want to search/filter campaigns within the CMS
  So that I can find specific campaigns quickly

  Background:
    Given a "ChangeSet" "First Campaign" with "Description"="this is a campaign"
      And a "ChangeSet" "Second Campaign" with "Description"="lorem ipsum" and "State"="published" and "PublishDate"="2025-01-01 12:00:00"
      And a "ChangeSet" "Third Campaign" with "Description"="lorem ipsum" and "State"="published" and "PublishDate"="2025-05-06 12:00:00"
      And the "group" "CAMPAIGNS_EDITOR" has permissions "Access to 'Campaigns' section"
      And I am logged in as a member of "CAMPAIGNS_EDITOR" group
      And I go to "/admin/campaigns"

  Scenario: I can search for campaigns using the general search
    Given I should not see a "#CampaignSearchForm_searchbox" element
    When I press the "Show search" button
    # Validate we see the expected campaigns before searching
    Then I should see a "#CampaignSearchForm_searchbox" element
      And I should see the campaign "First Campaign"
      And I should see the campaign "Second Campaign"
      And I should see the campaign "Third Campaign"
    # Search for something in the description
    When I fill in "SearchBox__q" with "ipsum"
      And I press the "Enter" key in the "SearchBox__q" field
    Then I should not see the campaign "First Campaign"
      And I should see the campaign "Second Campaign"
      And I should see the campaign "Third Campaign"
    # Clear search
    When I press the "Close search" button
    Then I should see the campaign "First Campaign"
      And I should see the campaign "Second Campaign"
      And I should see the campaign "Third Campaign"
      And I should not see a "#CampaignSearchForm_searchbox" element
    # Search for something in the title
    When I press the "Show search" button
      And I fill in "SearchBox__q" with "first"
      And I press the "Enter" key in the "SearchBox__q" field
    Then I should see the campaign "First Campaign"
      And I should not see the campaign "Second Campaign"
      And I should not see the campaign "Third Campaign"

  Scenario: I can filter for campaigns using the search options
    # Filter by unpublished campaigns
    When I press the "Show search" button
      And I press the "Search options" button
      And I select "Active" from "Status"
      And I press the "Search" button
    Then I should see the campaign "First Campaign"
      And I should not see the campaign "Second Campaign"
      And I should not see the campaign "Third Campaign"
    # Filter by published campaigns from a certain date
    When I press the "Search options" button
      And I select "Published" from "Status"
      # We can't use `And I fill in "Search__PublishDate_SearchFrom" with "some date"` because
      # the HTML5 datetime widget does weird things. This manual way works though.
      And I focus on the "input[name='Search__PublishDate_SearchFrom']" element
      And I type "01-05-2025" in the field
      And I press the "Tab" key globally
      And I type "12:00pm" in the field
      And I press the "Search" button
    Then I should not see the campaign "First Campaign"
      And I should not see the campaign "Second Campaign"
      And I should see the campaign "Third Campaign"
    # Clear the publish date filter
    When I click on the ".compact-tag-list__visible li.tag-component:nth-child(2) button.tag-component__delete" element
    Then I should not see the campaign "First Campaign"
      And I should see the campaign "Second Campaign"
      And I should see the campaign "Third Campaign"
