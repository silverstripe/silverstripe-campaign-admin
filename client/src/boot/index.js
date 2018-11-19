/* global document */
import ConfigHelpers from 'lib/Config';
import Injector from 'lib/Injector';
import reactRouteRegister from 'lib/ReactRouteRegister';
import CampaignAdmin from 'containers/CampaignAdmin/CampaignAdmin';
import CampaignReducer from 'state/campaign/CampaignReducer';
import applyConditionals from 'boot/applyConditionals';

document.addEventListener('DOMContentLoaded', () => {
  const sectionConfig = ConfigHelpers.getSection('SilverStripe\\CampaignAdmin\\CampaignAdmin');
  reactRouteRegister.add({
    path: '/',
    routes: [
      { path: `/${sectionConfig.url}/set/:id/:view`, component: CampaignAdmin },
      { path: `/${sectionConfig.url}/:type/:id/:view`, component: CampaignAdmin },
      { path: `/${sectionConfig.url}`, component: CampaignAdmin },
    ],
  });

  Injector.reducer.register('campaign', CampaignReducer);

  // Apply any injector transformations
  applyConditionals();
});
