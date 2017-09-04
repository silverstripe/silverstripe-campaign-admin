/* global jest, describe, beforeEach, it, expect */

jest.mock('components/Breadcrumb/Breadcrumb');
jest.mock('state/records/RecordsActions');

import { CampaignAdminList } from '../CampaignAdminList';

describe('CampaignAdminList', () => {
  let props = null;

  beforeEach(() => {
    props = {
      sectionConfig: {},
      itemListViewEndpoint: { url: '', method: 'POST' },
      record: {
        ID: 3,
        placeholderGroups: [
          {
            baseClass: 'SilverStripe\\CMS\\Model\\SiteTree',
            pluaral: 'Pages',
            sinular: 'Page',
            items: [],
          },
          {
            baseClass: 'SilverStripe\\Assets\\File',
            pluaral: 'Files',
            sinular: 'File',
            items: [],
          },
        ],
        _embedded: {
          items: [
          ],
        },
      },
      campaign: {},
    };
  });

  describe('getSelectedItem()', () => {
    let cmp = null;

    it('should return null if there\'s no items at all', () => {
      cmp = new CampaignAdminList(props);
      expect(cmp.getSelectedItem()).toBe(null);
    });

    it('should return the first item found if none selected by the user', () => {
      const modProps = { ...props };
      modProps.record._embedded.items = [
        {
          BaseClass: 'SilverStripe\\CMS\\Model\\SiteTree',
          Title: 'Page one',
        },
        {
          BaseClass: 'SilverStripe\\Assets\\File',
          Title: 'File one',
        },

      ];
      cmp = new CampaignAdminList(modProps);
      expect(cmp.getSelectedItem().Title).toBe('Page one');
    });

    it('should return the first item in the firts non empty display groups', () => {
      const modProps = { ...props };
      modProps.record._embedded.items = [
        {
          BaseClass: 'SilverStripe\\Assets\\File',
          Title: 'File one',
        },

      ];
      cmp = new CampaignAdminList(modProps);
      expect(cmp.getSelectedItem().Title).toBe('File one');
    });

    it('should return the item selected by the user', () => {
      const modProps = { ...props };
      modProps.record._embedded.items = [
        {
          BaseClass: 'SilverStripe\\CMS\\Model\\SiteTree',
          Title: 'Page one',
          ID: 3,
        },
        {
          BaseClass: 'SilverStripe\\CMS\\Model\\SiteTree',
          Title: 'Page two',
          ID: 12,
        },
        {
          BaseClass: 'SilverStripe\\Assets\\File',
          Title: 'File one',
          ID: 21,
        },

      ];
      modProps.campaign.changeSetItemId = 12;
      cmp = new CampaignAdminList(modProps);
      expect(cmp.getSelectedItem().Title).toBe('Page two');
    });
  });
});
