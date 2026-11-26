/**
 * A place for extra actions in the campaign admin toolbars, at the right of each toolbar.
 * It renders nothing. Use an Injector transformation to add actions.
 *
 * It gets these props:
 * - view: The view the toolbar is in. This is "index" for the list of campaigns, "show" for the items
 *   in a campaign, "edit" for the campaign edit form or "create" for the form to create a campaign.
 * - campaignId: The ID of the campaign, in the "show" and "edit" views
 */
const CampaignAdminToolbarActions = () => null;

export default CampaignAdminToolbarActions;
