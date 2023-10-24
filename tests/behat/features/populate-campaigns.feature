@javascript @retry
Feature: Populate campaigns
  As a cms author
  I want to populate campaigns within the CMS
  So that I can control bulk publication of content efficiently

  Background:
    Given a "page" "About Us"
    And a "page" "Contact Us"
    And a "image" "assets/folder1/file2.jpg"
    And a "Campaign" "Empty Campaign"
    And a campaign "Full Campaign" with changes "image"="assets/folder1/file2.jpg" and "page"="About Us"
    And the "group" "EDITOR" has permissions "Access to 'Pages' section" and "Access to 'Campaigns' section" and "Access to 'Files' section" and "FILE_EDIT_ALL"
    And I am logged in as a member of "EDITOR" group
    And I go to "/admin/campaigns"

  Scenario: I can build a campaign from pages and files
    When I go to "admin/pages"
    And I click on "About Us" in the tree
    Then I should see an edit page form
    When I fill in "About us changed" for "Title"
    And I fill in the "Content" HTML field with "<p>my new content</p>"
    And I press the "Save" button
    Then I should see the "Saved" button
    When I click on the ".toast__close" element
    And I click "More options" in the "#ActionMenus" element
    And I press the "Add to Campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    And I wait for 1 seconds until I see the ".modal__response--good" element
    Then I should see "Successfully added" in the ".modal-dialog" region
    When I close the modal
    And I go to "/admin/assets"
    And I wait for 10 seconds
    And I click the "folder1" gallery item
    And I click the "file2" gallery item
    Then I should see the "Form_fileEditForm" form
    When I fill in "renamedfile" for "Title"
    And I press the "Save" button
    And I press the "Other actions" button
    And I press the "Add to campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    And I wait for 1 seconds until I see the ".modal__response--good" element
    Then I should see "Successfully added" in the ".modal-dialog" region
    When I close the modal
    And I go to "/admin/campaigns"
    And I wait until I see the ".grid-field__table" element
    Then I should see "2 total (2 changes)" in column 2 of the "Empty Campaign" campaign
    When I view the campaign "Empty Campaign"
    Then I should see the "About us changed" campaign item
    And I should see the "renamedfile" campaign item
    And the "Publish campaign" button should not be disabled

  Scenario: I can manage campaign items
    When I wait until I see the ".grid-field__table" element
    And I should see "2 total (2 changes)" in column 2 of the "Full Campaign" campaign
    And I view the campaign "Full Campaign"
    Then I should see the "About Us" campaign item
    And I should see the "file2" campaign item
    And the "Publish campaign" button should not be disabled
    And I should see "1 Page" in the ".accordion" region
    And I should see "1 File" in the ".accordion" region
    When I press the "1 Page" button
    Then I should not see the "About Us" campaign item
    And I should see the "file2" campaign item
    When I press the "1 File" button
    Then I should not see the "About Us" campaign item
    And I should not see the "file2" campaign item
    When I press the "1 Page" button
    And I select the "About Us" campaign item
    And I press the "Edit" button
    Then I should see the "Form_EditForm" form
    And the "Title" field should contain "About Us"
    When I go to "admin/campaigns"
    And I view the campaign "Full Campaign"
    And I select the "About Us" campaign item
    And I wait until I see the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I click on the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I press the "Remove" button, confirming the dialog
    Then I should not see the "About Us" campaign item
    When I press the "Publish campaign" button, confirming the dialog
    Then I should see a "Published "Full Campaign" successfully." success toast
    When I press the "Campaigns" button
    Then I should see "Published" in column 3 of the "Full Campaign" campaign

Scenario: I can remove a campaign item with implicitly added items
    When I go to "admin/pages"
    And I click on "About Us" in the tree
    Then I should see an edit page form
    When I fill in "New About us page" for "Title"
    And I fill in the "Content" HTML field with "<p>my new content</p>"
    And I press the "Save" button
    And I press the "Insert from Files" HTML field button
    And I click the "folder1" gallery item
    And I click the "file2" gallery item
    And I press the "Insert file" button
    Then the "Content" HTML field should contain "file2.jpg"
    And I press the "Save" button
    Then I should see the "Saved" button
    And I click "More options" in the "#ActionMenus" element
    And I press the "Add to Campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    When I close the modal
    When I go to "admin/campaigns"
    And I view the campaign "Empty Campaign"
    Then I should see the "New About us page" campaign item
    And I should see the "file2" campaign item
    When I press the "Publish campaign" button, confirming the dialog
    Then I should see a "Published "Empty Campaign" successfully." success toast
    And I select the "New About us page" campaign item
    And I wait until I see the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I click on the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I press the "Remove" button, confirming the dialog
    Then I should not see the "New About us page" campaign item
    And I should not see the "file2" campaign item

Scenario: I can remove a campaign item with shared implicitly added items that exist in other campaign items
    When I go to "admin/pages"
    And I click on "About Us" in the tree
    Then I should see an edit page form
    When I fill in "New About us page" for "Title"
    And I fill in the "Content" HTML field with "<p>my new content</p>"
    And I press the "Save" button
    And I press the "Insert from Files" HTML field button
    And I click the "folder1" gallery item
    And I click the "file2" gallery item
    And I press the "Insert file" button
    Then the "Content" HTML field should contain "file2.jpg"
    And I press the "Save" button
    Then I should see the "Saved" button
    And I click "More options" in the "#ActionMenus" element
    And I press the "Add to Campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    When I close the modal
    Then I go to "admin/pages"
    And I click on "Contact Us" in the tree
    Then I should see an edit page form
    When I fill in "New Contact us page" for "Title"
    And I fill in the "Content" HTML field with "<p>my new content</p>"
    And I press the "Save" button
    And I press the "Insert from Files" HTML field button
    And I click the "folder1" gallery item
    And I click the "file2" gallery item
    And I press the "Insert file" button
    Then the "Content" HTML field should contain "file2.jpg"
    And I press the "Save" button
    Then I should see the "Saved" button
    And I click "More options" in the "#ActionMenus" element
    And I press the "Add to Campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    When I close the modal
    When I go to "admin/campaigns"
    And I view the campaign "Empty Campaign"
    Then I should see the "New About us page" campaign item
    And I should see the "file2" campaign item
    When I press the "Publish campaign" button, confirming the dialog
    Then I should see a "Published "Empty Campaign" successfully." success toast
    And I select the "New About us page" campaign item
    And I wait until I see the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I click on the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I press the "Remove" button, confirming the dialog
    Then I should not see the "New About us page" campaign item
    And I should see the "New Contact us page" campaign item
    And I should see the "file2" campaign item

  Scenario: I can remove a campaign item with implicitly added item that exist in campaign as explicitly added item
    When I go to "admin/pages"
    And I click on "About Us" in the tree
    Then I should see an edit page form
    When I fill in "New About us page" for "Title"
    And I fill in the "Content" HTML field with "<p>my new content</p>"
    And I press the "Save" button
    And I press the "Insert from Files" HTML field button
    And I click the "folder1" gallery item
    And I click the "file2" gallery item
    And I press the "Insert file" button
    Then the "Content" HTML field should contain "file2.jpg"
    And I press the "Save" button
    Then I should see the "Saved" button
    And I go to "/admin/assets"
    And I wait for 10 seconds
    And I click the "folder1" gallery item
    And I click the "file2" gallery item
    Then I should see the "Form_fileEditForm" form
    And I press the "Other actions" button
    And I press the "Add to campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    And I wait for 1 seconds until I see the ".modal__response--good" element
    Then I should see "Successfully added" in the ".modal-dialog" region
    When I close the modal
    When I go to "admin/pages"
    And I click on "New About us page" in the tree
    Then I should see an edit page form
    And I click "More options" in the "#ActionMenus" element
    And I press the "Add to Campaign" button
    Then I should see a modal titled "Add to campaign"
    When I select "Empty Campaign" from "Campaign"
    And I press the "Add" button
    And I wait for 1 seconds until I see the ".modal__response--good" element
    Then I should see "Successfully added" in the ".modal-dialog" region
    When I close the modal
    When I go to "admin/campaigns"
    And I view the campaign "Empty Campaign"
    Then I should see the "New About us page" campaign item
    And I should see the "file2" campaign item
    When I press the "Publish campaign" button, confirming the dialog
    Then I should see a "Published "Empty Campaign" successfully." success toast
    And I select the "New About us page" campaign item
    And I wait until I see the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I click on the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I press the "Remove" button, confirming the dialog
    Then I should not see the "New About us page" campaign item
    And I should see the "file2" campaign item
    And I select the "file2" campaign item
    And I wait until I see the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I click on the ".campaign-admin__campaign-preview .action-menu__toggle" element
    And I press the "Remove" button, confirming the dialog
    Then I should not see the "file2" campaign item
