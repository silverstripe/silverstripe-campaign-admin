/* global jest, test, describe, beforeEach, it, expect */

import React from 'react';
import { Component as CampaignAdminList } from '../CampaignAdminList';
import { render, screen } from '@testing-library/react';

function makeProps(obj = {}) {
  return {
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
          {
            ID: 1,
            BaseClass: 'TestBaseA',
            Title: 'File One',
            _links: {
              referenced_by: [{}]
            }
          },
          {
            ID: 2,
            BaseClass: 'TestBaseB',
            Title: 'File Two',
            _links: {
              referenced_by: [{}, {}]
            }
          },
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
    PreviewComponent: ({ className, moreActions }) => (
      <div data-testid="test-preview" className={className}>
        {moreActions}
      </div>
    ),
    DropdownItemComponent: ({ className, children }) => (
      <div data-testid="test-dropdown-item" className={className}>
        {children}
      </div>
    ),
    BreadcrumbComponent: () => <div data-testid="test-breadcrumb"/>,
    ...obj
  };
}

test('CampaignAdminList should render a preview and a dropdown item of the first item if none selected', async () => {
  render(
    <CampaignAdminList {...makeProps()}/>
  );
  const preview = await screen.findByTestId('test-preview');
  expect(preview.classList).toContain('campaign-admin__campaign-preview');
  const item = await screen.findByTestId('test-dropdown-item');
  expect(item.classList).toContain('campaign-admin__unremoveable-item');
  expect(screen.queryByText('File One').classList).toContain('list-group-item__heading');
  expect(screen.queryByText('Required by 1 item(s), and cannot be removed directly.')).not.toBeNull();
});

test('CampaignAdminList should not render a preview if there are no items', async () => {
  render(
    <CampaignAdminList {...makeProps({
      record: {
        _embedded: {
          items: []
        }
      }
    })}
    />
  );
  await screen.findByText('Select "Add to Campaign" from pages, files, and other admin sections with content types');
  expect(screen.queryByTestId('test-preview')).toBeNull();
  expect(screen.queryByTestId('test-dropdown-item')).toBeNull();
});

test('CampaignAdminList should the selected item if selected', async () => {
  render(
    <CampaignAdminList {...makeProps({
      campaign: {
        changeSetItemId: 2
      }
    })}
    />
  );
  const preview = await screen.findByTestId('test-preview');
  expect(preview.classList).toContain('campaign-admin__campaign-preview');
  const item = await screen.findByTestId('test-dropdown-item');
  expect(item.classList).toContain('campaign-admin__unremoveable-item');
  expect(screen.queryByText('File Two').classList).toContain('list-group-item__heading');
  expect(screen.queryByText('Required by 2 item(s), and cannot be removed directly.')).not.toBeNull();
});

test('CampaignAdminList render the error message', () => {
  [
    { status: 400, message: 'Something went wrong.' },
    { status: 403, message: 'You do not have access to view this campaign.' },
    { status: 404, message: 'The campaign you are looking for can not be found.' },
    { status: 500, message: 'Something went wrong.' },
  ].forEach(async ({ status, message }) => {
    render(
      <CampaignAdminList {...makeProps({
        record: {},
        recordActions: {
          fetchRecord: () => Promise.reject({
            response: {
              status
            }
          })
        }
      })}
      />
    );
    await screen.findByText(message);
  });
});
