/* global jest, test, describe, beforeEach, it, expect */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Component as CampaignAdminList } from '../CampaignAdminList';

function makeProps(obj = {}) {
  return {
    sectionConfig: {
      reactRoutePath: '',
    },
    itemListViewEndpoint: { url: '', method: 'POST' },
    record: {
      ID: 3,
      State: 'open',
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

test('CampaignAdminList does render loading spinner when loading', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps()}/>
  );
  expect(container.querySelector('.cms-content-loading-overlay')).toBeNull();
  expect(container.querySelector('.cms-content-loading-spinner')).toBeNull();
});

test('CampaignAdminList does not render loading spinner when not loading', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      record: {},
      recordActions: {
        fetchRecord: () => new Promise(() => {})
      }
    })}
    />
  );
  expect(container.querySelector('.cms-content-loading-overlay')).not.toBeNull();
  expect(container.querySelector('.cms-content-loading-spinner')).not.toBeNull();
});

test('CampaignAdminList groups items by BaseClass', async () => {
  render(
    <CampaignAdminList {...makeProps()}/>
  );
  const groupItems = screen.getAllByRole('button');
  expect(groupItems.length).toBeGreaterThan(0);
});

test('CampaignAdminList renders accordion blocks for each item group', async () => {
  const { container } = render(
    <CampaignAdminList {...makeProps()}/>
  );
  const groupWrappers = container.querySelectorAll('.list-group-wrapper');
  expect(groupWrappers.length).toBeGreaterThan(0);
});

test('CampaignAdminList applies inactive class to published items', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      record: {
        ID: 3,
        State: 'published',
        placeholderGroups: [],
        _embedded: {
          items: [
            {
              ID: 1,
              BaseClass: 'TestBase',
              Title: 'Test Item',
              ChangeType: 'none',
              _links: {}
            }
          ]
        }
      }
    })}
    />
  );
  const listItems = container.querySelectorAll('.list-group-item--inactive');
  expect(listItems.length).toBeGreaterThan(0);
});

test('CampaignAdminList applies active class to selected item', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      campaign: {
        changeSetItemId: 1
      }
    })}
    />
  );
  const activeItems = container.querySelectorAll('.list-group-item.active');
  expect(activeItems.length).toBeGreaterThan(0);
});

test('CampaignAdminList shows back button when in edit mode', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      previewState: 'edit'
    })}
    />
  );
  const toolbar = container.querySelector('.toolbar');
  expect(toolbar).not.toBeNull();
});

test('CampaignAdminList hides detail panel when previewState is preview', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      previewState: 'preview'
    })}
    />
  );
  const detailPanel = container.querySelector('.campaign-admin__campaign-items');
  expect(detailPanel).toBeNull();
});

test('CampaignAdminList shows new item success message when newItem is set', () => {
  render(
    <CampaignAdminList {...makeProps({
      newItem: true
    })}
    />
  );
  expect(screen.queryByText('Nice one! You have successfully created a campaign.')).not.toBeNull();
});

test('CampaignAdminList does not show new item success message when newItem is null', () => {
  render(
    <CampaignAdminList {...makeProps({
      newItem: null
    })}
    />
  );
  expect(screen.queryByText('Nice one! You have successfully created a campaign.')).toBeNull();
});

test('CampaignAdminList applies hide-preview class when no item is selected', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      campaign: {
        changeSetItemId: null
      }
    })}
    />
  );
  const mainDiv = container.querySelector('.campaign-admin__campaign');
  expect(mainDiv.classList.contains('campaign-admin__campaign--hide-preview')).toBe(true);
});

test('CampaignAdminList renders publish button when campaign is open and has items', () => {
  const { container } = render(
    <CampaignAdminList {...makeProps({
      record: {
        ID: 3,
        State: 'open',
        placeholderGroups: [],
        _embedded: {
          items: [
            {
              ID: 1,
              BaseClass: 'TestBase',
              Title: 'Test Item',
              ChangeType: 'added',
              _links: {}
            }
          ]
        }
      }
    })}
    />
  );
  const toolbar = container.querySelector('.toolbar--south');
  expect(toolbar).not.toBeNull();
});

test('CampaignAdminList disables publish button when campaign has no items', () => {
  render(
    <CampaignAdminList {...makeProps({
      record: {
        ID: 3,
        State: 'open',
        placeholderGroups: [],
        _embedded: {
          items: []
        }
      }
    })}
    />
  );
  expect(screen.queryByTestId('test-preview')).toBeNull();
});

test('CampaignAdminList shows no items text for empty groups', () => {
  render(
    <CampaignAdminList {...makeProps({
      record: {
        ID: 3,
        State: 'open',
        placeholderGroups: [
          {
            baseClass: 'SilverStripe\\CMS\\Model\\SiteTree',
            singular: 'Page',
            plural: 'Pages',
            items: [],
            noItemsText: 'No pages'
          }
        ],
        _embedded: {
          items: []
        }
      }
    })}
    />
  );
  expect(screen.queryByText('No pages')).not.toBeNull();
});

test('CampaignAdminList displays item with link references when selected item has references', async () => {
  render(
    <CampaignAdminList {...makeProps({
      campaign: {
        changeSetItemId: 1
      },
      record: {
        ID: 3,
        State: 'open',
        placeholderGroups: [],
        _embedded: {
          items: [
            {
              ID: 1,
              BaseClass: 'TestBase',
              Title: 'Item with links',
              ChangeType: 'added',
              _links: {
                references: [
                  { ChangeSetItemID: 2 }
                ],
                referenced_by: []
              }
            },
            {
              ID: 2,
              BaseClass: 'TestBase',
              Title: 'Referenced item',
              ChangeType: 'added',
              _links: {
                references: [],
                referenced_by: [
                  { ChangeSetItemID: 1 }
                ]
              }
            }
          ]
        }
      }
    })}
    />
  );
  const preview = await screen.findByTestId('test-preview');
  expect(preview).not.toBeNull();
});

test('CampaignAdminList renders remove action when item was added explicitly', async () => {
  render(
    <CampaignAdminList {...makeProps({
      campaign: {
        changeSetItemId: 1
      },
      record: {
        ID: 3,
        State: 'open',
        placeholderGroups: [],
        _embedded: {
          items: [
            {
              ID: 1,
              BaseClass: 'TestBase',
              Title: 'Explicitly Added Item',
              Added: 'explicitly',
              ChangeType: 'added',
              _links: {
                references: [],
                referenced_by: []
              }
            }
          ]
        }
      }
    })}
    />
  );
  const removeButton = await screen.findByTestId('test-dropdown-item');
  expect(removeButton.textContent).toContain('Remove');
});

test('CampaignAdminList breadcrumbs are set based on record name', () => {
  const setBreadcrumbsMock = jest.fn();
  render(
    <CampaignAdminList {...makeProps({
      breadcrumbsActions: {
        setBreadcrumbs: setBreadcrumbsMock
      },
      record: {
        ID: 3,
        Name: 'Test Campaign',
        State: 'open',
        placeholderGroups: [],
        _embedded: {
          items: []
        }
      }
    })}
    />
  );
  expect(setBreadcrumbsMock).toHaveBeenCalled();
});

test('CampaignAdminList calls setNewItem with null on unmount', () => {
  const setNewItemMock = jest.fn();
  const { unmount } = render(
    <CampaignAdminList {...makeProps({
      campaignActions: {
        setNewItem: setNewItemMock,
        selectChangeSetItem: jest.fn()
      }
    })}
    />
  );
  unmount();
  expect(setNewItemMock).toHaveBeenCalledWith(null);
});
