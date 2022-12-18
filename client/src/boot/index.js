/* global document */
import Config from 'lib/Config';
import Injector from 'lib/Injector';
import reactRouteRegister from 'lib/ReactRouteRegister';
import CampaignAdmin from 'containers/CampaignAdmin/CampaignAdmin';
import CampaignReducer from 'state/campaign/CampaignReducer';
import applyConditionals from 'boot/applyConditionals';

document.addEventListener('DOMContentLoaded', () => {
  const baseURL = Config.getSection('SilverStripe\\CampaignAdmin\\CampaignAdmin').reactRoutePath;
  reactRouteRegister.add({
    path: '/',
    routes: [
      { path: `/${baseURL}/set/:id/:view`, component: CampaignAdmin },
      { path: `/${baseURL}/:type/:id/:view`, component: CampaignAdmin },
      { path: `/${baseURL}`, component: CampaignAdmin },
    ],
  });

  Injector.reducer.register('campaign', CampaignReducer);

  // Apply any injector transformations
  applyConditionals();
});
