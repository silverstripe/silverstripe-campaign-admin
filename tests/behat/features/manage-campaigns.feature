@javascript @retry
Feature: Manage campaigns
  As a cms author
  I want to manage campaigns within the CMS
  So that I can control bulk publication of content efficiently

  Background:
    Given a "campaign" "Test Campaign" with "Description"="this is a test"
      And the "group" "EDITOR" has permissions "Access to 'Pages' section" and "Access to 'Campaigns' section" and "Access to 'Files' section" and "FILE_EDIT_ALL"
      And the "group" "CAMPAIGNS_EDITOR" has permissions "Access to 'Campaigns' section"

  Scenario: I can create a campaign
    Given I am logged in as a member of "CAMPAIGNS_EDITOR" group
      And I go to "/admin/campaigns"
    When I press the "Add campaign" button
      Then I should see the "Form_campaignCreateForm" form
    When I fill in "Name" with "newcampaign"
      And I fill in "Description" with "awesome campaign"
      And I press the "Create" button
    Then the "p.alert" element should contain "Nice one! You have successfully created a campaign."
      And the "Publish campaign" button should be disabled

  Scenario: I can edit campaign
    Given I am logged in as a member of "CAMPAIGNS_EDITOR" group
      And I go to "/admin/campaigns"
    When I wait until I see the ".grid-field__table" element
      And I edit the campaign "Test Campaign"
    Then the "Name" field should contain "Test Campaign"
      And the "Description" field should contain "this is a test"
      And the "State" field should contain "open"
      And I should see a "button.font-icon-tick[name=action_save]" element
    When I fill in "Name" with "changed"
    Then I should see a "button.font-icon-save[name=action_save]" element
    When I fill in "Name" with "Test Campaign"
    Then I should see a "button.font-icon-tick[name=action_save]" element
    When I fill in "Name" with "Test campaign changed"
      And I press the "Save" button
      And I press the "Campaigns" button
    Then I should see the campaign "Test campaign changed"

  Scenario: I can delete a campaign
    Given I am logged in as a member of "CAMPAIGNS_EDITOR" group
      And I go to "/admin/campaigns"
    When I wait until I see the ".grid-field__table" element
      And I delete the campaign "Test Campaign"
    Then I should not see the campaign "Test Campaign"

  @modal
  Scenario: Publishing a campaign publishes associated assets

    Given a "page" "My page"
    And a "image" "assets/file2.jpg"
    And I am logged in as a member of "EDITOR" group

    # Page is draft
    When I go to "/admin/pages"
    Then the rendered HTML should contain "badge status-addedtodraft"
    And I follow "My page"
    And I click on the "#tab-ActionMenus_MoreOptions" element
    And I click on the "#Form_EditForm_action_addtocampaign" element
    And I wait for 5 seconds
    And I select "Test Campaign" from "Form_EditForm_AddToCampaign_Campaign"
    And I press the "Add" button

    When I go to "/admin/assets"
    Then the rendered HTML should contain "gallery-item--draft"
    And I click on the ".gallery__files .gallery-item" element
    And I click on the "#Form_fileEditForm_PopoverActions" element
    And I wait for 1 second
    And I click on the "#Form_fileEditForm_action_addtocampaign" element
    And I wait for 5 seconds
    And I select "Test Campaign" from "Form_EditForm_AddToCampaign_Campaign"
    And I press the "Add" button

    When I go to "/admin/campaigns"
    And I click on the ".grid-field__cell--drillable" element
    And I press the "Publish campaign" button
    And I confirm the dialog
    And I should not see the "Publish campaign" button
    And I should not see an "#tab-ActionMenus_MoreOptions" element

    When I go to "/admin/pages"
    Then the rendered HTML should not contain "badge status-addedtodraft"

    When I go to "/admin/assets"
    Then the rendered HTML should not contain "gallery-item--draft"
