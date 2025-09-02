@retry
Feature: Accessibility
  As a keyboard user
  I want to be able to easily navigate campaign-admin with my keyboard

  Scenario: Help menu keyboard navigation
    Given I am logged in with "ADMIN" permissions
    And I go to "/admin/campaigns"
    Then I should see "How do campaigns work?"
    And I should see an ".campaign-info__close" element
    And I should not see an ".CampaignAdmin button[aria-label='Show help']" element

    # Can shift-tab to toggle button
    When I press the "Shift-Tab" key globally
    When I press the "Shift-Tab" key globally
    When I press the "Shift-Tab" key globally
    When I press the "Shift-Tab" key globally
    When I press the "Shift-Tab" key globally
    When I press the "Shift-Tab" key globally
    When I press the "Shift-Tab" key globally
    Then the ".campaign-info__close" element should have focus

    # Can toggle help menu closed
    When I press the "Enter" key globally
    Then I should not see "How do campaigns work?"
    And I should not see an ".campaign-info__close" element
    And I should see an ".CampaignAdmin button[aria-label='Show help']" element
    And the ".CampaignAdmin button[aria-label='Show help']" element should have focus

    # Can toggle help menu open
    When I press the "Enter" key globally
    Then I should see "How do campaigns work?"
    And I should see an ".campaign-info__close" element
    And I should not see an ".CampaignAdmin button[aria-label='Show help']" element
    Then the ".campaign-info__close" element should have focus
