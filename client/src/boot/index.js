/* global document */
import Config from 'lib/Config';
import Injector from 'lib/Injector';
import reactRouteRegister from 'lib/ReactRouteRegister';
import CampaignAdmin from 'containers/CampaignAdmin/CampaignAdmin';
import CampaignReducer from 'state/campaign/CampaignReducer';
import applyConditionals from 'boot/applyConditionals';
import { joinUrlPaths } from 'lib/urls';

document.addEventListener('DOMContentLoaded', () => {
  const baseURL = Config.getSection('SilverStripe\\CampaignAdmin\\CampaignAdmin').reactRoutePath;
  reactRouteRegister.add({
    path: '/',
    routes: [
      { path: joinUrlPaths(baseURL, 'set/:id/:view'), component: CampaignAdmin },
      { path: joinUrlPaths(baseURL, ':type/:id/:view'), component: CampaignAdmin },
      { path: baseURL, component: CampaignAdmin },
    ],
  });

  Injector.reducer.register('campaign', CampaignReducer);

  // Apply any injector transformations
  applyConditionals();
});
