import { withRouter } from 'react-router';
import ConfigHelpers from 'lib/Config';
import reducerRegister from 'lib/ReducerRegister';
import reactRouteRegister from 'lib/ReactRouteRegister';
import CampaignAdmin from 'containers/CampaignAdmin/CampaignAdmin';
import CampaignReducer from 'state/campaign/CampaignReducer';

document.addEventListener('DOMContentLoaded', () => {
  const sectionConfig = ConfigHelpers.getSection('SilverStripe\\CampaignAdmin\\CampaignAdmin');
  reactRouteRegister.add({
    path: sectionConfig.url,
    component: withRouter(CampaignAdmin),
    childRoutes: [
      { path: ':type/:id/:view', component: CampaignAdmin },
      { path: 'set/:id/:view', component: CampaignAdmin },
    ],
  });

  reducerRegister.add('campaign', CampaignReducer);
});
