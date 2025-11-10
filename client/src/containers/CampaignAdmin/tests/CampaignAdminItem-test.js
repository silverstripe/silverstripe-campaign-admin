/* global jest, test, describe, beforeEach, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
import CampaignAdminItem from '../CampaignAdminItem';

function makeProps(obj = {}) {
  return {
    campaign: {},
    item: { ID: 1 },
    ...obj
  };
}

test('CampaignAdminItem should not show link icon by default', () => {
  const { container } = render(<CampaignAdminItem {...makeProps()} />);
  expect(container.querySelectorAll('.campaign-admin__item-links')).toHaveLength(0);
});

test('CampaignAdminItem should show link icon when the item is being from the selected item', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      isLinked: true
    })}
    />
  );
  expect(container.querySelectorAll('.campaign-admin__item-links')).toHaveLength(1);
});

test('CampaignAdminItem should show link icon when the item is selected and have links to other items', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      isLinked: false,
      selected: true,
      item: {
        _links: {
          references: [
            { ID: 2 },
            { ID: 3 },
            { ID: 4 },
          ],
        },
      },
    })}
    />
  );
  expect(container.querySelectorAll('.campaign-admin__item-links')).toHaveLength(1);
});

test('CampaignAdminItem should show correct link to information in the tooltip', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      selected: true,
      item: {
        _links: {
          references: [
            { ID: 2 },
          ],
        },
      },
    })}
    />
  );
  expect(container.querySelector('.campaign-admin__item-links__number').innerHTML).toBe('1');
});

test('CampaignAdminItem should show correct linked by information in the tooltip', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      selected: true,
      item: {
        _links: {
          references: [
            { ID: 2 },
            { ID: 3 },
            { ID: 4 },
            { ID: 4 },
            { ID: 5 },
            { ID: 7 },
            { ID: 8 },
            { ID: 9 },
            { ID: 10 },
            { ID: 11 },
          ],
        },
      },
    })}
    />
  );
  expect(container.querySelector('.campaign-admin__item-links__number').innerHTML).toBe('10');
});

test('CampaignAdminItem should show correct linked by information in the tooltip', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      selected: true,
      item: {
        _links: {
          referenced_by: [
            { ChangeSetItemID: 2 },
            { ChangeSetItemID: 3 },
            { ChangeSetItemID: 4 },
          ],
        },
      },
    })}
    />
  );
  expect(container.querySelector('.campaign-admin__item-links__number').innerHTML).toBe('3');
});

test('CampaignAdminItem should display item title from props', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      item: { ID: 1, Title: 'Test Title' }
    })}
    />
  );
  expect(container.querySelector('.list-group-item__heading').innerHTML).toBe('Test Title');
  expect(container.querySelector('.list-group-item__heading').getAttribute('title')).toBe('Test Title');
});

test('CampaignAdminItem should display untitled text when item has no title', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      item: { ID: 1 }
    })}
    />
  );
  expect(container.querySelector('.list-group-item__heading').textContent).toContain('Untitled');
});

test('CampaignAdminItem should display thumbnail when item has thumbnail', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      item: {
        ID: 1,
        Title: 'Test Item',
        Thumbnail: 'http://example.com/thumbnail.jpg'
      }
    })}
    />
  );
  const thumbnail = container.querySelector('.list-group-item__thumbnail img');
  expect(thumbnail).not.toBeNull();
  expect(thumbnail.getAttribute('src')).toBe('http://example.com/thumbnail.jpg');
  expect(thumbnail.getAttribute('alt')).toBe('Test Item');
});

test('CampaignAdminItem should not display thumbnail when item has no thumbnail', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      item: { ID: 1, Title: 'Test Item' }
    })}
    />
  );
  expect(container.querySelector('.list-group-item__thumbnail')).toBeNull();
});

test('CampaignAdminItem should display draft badge when campaign is open and change type is created', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      campaign: { State: 'open' },
      item: {
        ID: 1,
        Title: 'Test Item',
        ChangeType: 'created'
      }
    })}
    />
  );
  const badge = container.querySelector('.badge.status-addedtodraft');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toContain('Draft');
});

test('CampaignAdminItem should display modified badge when campaign is open and change type is modified', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      campaign: { State: 'open' },
      item: {
        ID: 1,
        Title: 'Test Item',
        ChangeType: 'modified'
      }
    })}
    />
  );
  const badge = container.querySelector('.badge.status-modified');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toContain('Modified');
});

test('CampaignAdminItem should display removed badge when campaign is open and change type is deleted', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      campaign: { State: 'open' },
      item: {
        ID: 1,
        Title: 'Test Item',
        ChangeType: 'deleted'
      }
    })}
    />
  );
  const badge = container.querySelector('.badge.status-removedfromdraft');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toContain('Removed');
});

test('CampaignAdminItem should display no changes badge when campaign is open and change type is none', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      campaign: { State: 'open' },
      item: {
        ID: 1,
        Title: 'Test Item',
        ChangeType: 'none'
      }
    })}
    />
  );
  const badge = container.querySelector('.badge.list-group-item__status');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toContain('No changes');
});

test('CampaignAdminItem should not display badge when campaign is not open', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      campaign: { State: 'published' },
      item: {
        ID: 1,
        Title: 'Test Item',
        ChangeType: 'created'
      }
    })}
    />
  );
  expect(container.querySelector('.badge')).toBeNull();
});

test('CampaignAdminItem should show correct total link count for both references and referenced_by', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      selected: true,
      item: {
        _links: {
          references: [{ ID: 2 }, { ID: 3 }],
          referenced_by: [{ ID: 4 }, { ID: 5 }, { ID: 6 }]
        }
      }
    })}
    />
  );
  expect(container.querySelector('.campaign-admin__item-links__number').innerHTML).toBe('5');
});

test('CampaignAdminItem should show link icon with is-linked class when isLinked prop is true', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      isLinked: true
    })}
    />
  );
  const linkElement = container.querySelector('.campaign-admin__item-links');
  expect(linkElement).not.toBeNull();
  expect(linkElement.classList.contains('campaign-admin__item-links--is-linked')).toBe(true);
});

test('CampaignAdminItem should show link icon with has-links class when selected and has links', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      selected: true,
      item: {
        _links: {
          references: [{ ID: 2 }]
        }
      }
    })}
    />
  );
  const linkElement = container.querySelector('.campaign-admin__item-links');
  expect(linkElement).not.toBeNull();
  expect(linkElement.classList.contains('campaign-admin__item-links--has-links')).toBe(true);
});

test('CampaignAdminItem should include info class on links container', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      isLinked: true
    })}
    />
  );
  const linkElement = container.querySelector('.list-group-item__info');
  expect(linkElement).not.toBeNull();
});

test('CampaignAdminItem should render link icon element when links are shown', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      isLinked: true
    })}
    />
  );
  expect(container.querySelector('.font-icon-link')).not.toBeNull();
});

test('CampaignAdminItem should not show links when not selected and no references', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      selected: false,
      isLinked: false,
      item: {
        _links: {
          references: []
        }
      }
    })}
    />
  );
  expect(container.querySelector('.campaign-admin__item-links')).toBeNull();
});

test('CampaignAdminItem should create unique tooltip ID based on item ID', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      isLinked: true,
      item: { ID: 42 }
    })}
    />
  );
  const tooltipTarget = container.querySelector('[id^="campaign-tooltip-"]');
  expect(tooltipTarget).not.toBeNull();
  expect(tooltipTarget.getAttribute('id')).toBe('campaign-tooltip-42');
});

test('CampaignAdminItem should render all required structure divs', () => {
  const { container } = render(
    <CampaignAdminItem {...makeProps({
      item: { ID: 1, Title: 'Test' }
    })}
    />
  );
  expect(container.querySelector('.fill-width')).not.toBeNull();
  expect(container.querySelector('.list-group-item__details')).not.toBeNull();
});
