/* global jest, describe, beforeEach, it, expect */

jest.mock('components/Breadcrumb/Breadcrumb');
jest.mock('state/records/RecordsActions');
jest.mock('components/ActionMenu/ActionMenu');

import React from 'react';
import { Component as CampaignAdminList } from '../CampaignAdminList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setImmediate } from 'core-js';

Enzyme.configure({ adapter: new Adapter() });

describe('CampaignAdminList', () => {
  let props = null;

  beforeEach(() => {
    props = {
      sectionConfig: {
        reactRoutePath: '',
      },
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
      breadcrumbsActions: {
        setBreadcrumbs: jest.fn(),
      },
      campaignActions: {
        setNewItem: jest.fn(),
      },
      recordActions: {
        fetchRecord: jest.fn(),
      },
      publishApi: jest.fn(),
      FormActionComponent: () => <div />,
      ViewModeComponent: () => <div />,
      PreviewComponent: () => <div />,
    };
  });

  describe('getSelectedItem()', () => {
    let cmp = null;

    it('should return null if there\'s no items at all', () => {
      cmp = shallow(<CampaignAdminList {...props} />);
      expect(cmp.instance().getSelectedItem()).toBe(null);
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
      cmp = shallow(<CampaignAdminList {...props} />);
      expect(cmp.instance().getSelectedItem().Title).toBe('Page one');
    });

    it('should return the first item in the firts non empty display groups', () => {
      const modProps = { ...props };
      modProps.record._embedded.items = [
        {
          BaseClass: 'SilverStripe\\Assets\\File',
          Title: 'File one',
        },

      ];
      cmp = shallow(<CampaignAdminList {...props} />);
      expect(cmp.instance().getSelectedItem().Title).toBe('File one');
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
      cmp = shallow(<CampaignAdminList {...props} />);
      expect(cmp.instance().getSelectedItem().Title).toBe('Page two');
    });
  });

  describe('componentDidMount_set_error', () => {
    let cmp = null;

    it.each(
      [
        { code: 400, message: 'Something went wrong.' },
        { code: 403, message: 'You do not have access to view this campaign.' },
        { code: 404, message: 'The campaign you are looking for can not be found.' },
        { code: 500, message: 'Something went wrong.' },
      ]
    )('should return error code and error message', ({ code, message }, done) => {
      const modProps = { ...props };
      modProps.itemListViewEndpoint = { url: '', method: 'GET' };
      modProps.recordActions = {
        fetchRecord: jest.fn(() => new Promise(() => {
          const error = new Error('Bad Request');
          error.response = { status: code };
          throw error;
        })),
      };
      modProps.record = {};

      cmp = shallow(<CampaignAdminList {...modProps} />);
      cmp.instance().componentDidMount();

      setImmediate(() => {
        const errorCode = cmp.state().errorCode;
        const msg = cmp.instance().renderErrorMessage(errorCode);
        expect(msg.props.children).toBe(message);
        expect(cmp.state().error).toBe(true);
        expect(errorCode).toBe(code);

        done();
      });
    });
  });
});
