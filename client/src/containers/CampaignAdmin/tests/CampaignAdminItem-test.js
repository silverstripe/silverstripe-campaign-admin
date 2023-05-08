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
