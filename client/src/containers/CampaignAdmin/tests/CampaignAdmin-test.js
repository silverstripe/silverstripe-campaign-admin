/* global jest, test, describe, beforeEach, it, expect */

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Component as CampaignAdmin } from '../CampaignAdmin';

let mockResponse;

function makeProps(obj = {}) {
  return {
    sectionConfig: {
      reactRoutePath: '/campaigns',
      publishEndpoint: {
        url: '/',
        method: 'get',
      },
      form: {
        EditForm: {
          schemaUrl: 'schemaEditForm'
        },
        campaignCreateForm: {
          schemaUrl: '/my/schema'
        }
      }
    },
    breadcrumbsActions: {
      setBreadcrumbs: jest.fn(),
    },
    securityId: 'secured',
    onResize: jest.fn(),
    FormBuilderLoaderComponent: ({ onSubmit }) => <div
      data-testid="test-form-builder-loader"
      onClick={() => onSubmit({}, 'action_save', () => Promise.resolve(mockResponse))}
    />,
    BreadcrumbComponent: () => <div data-testid="test-breadcrumb"/>,
    campaignActions: {
      setNewItem: () => null
    },
    match: {
      params: {
        id: null,
        view: null
      }
    },
    router: {
      params: {
        view: 'create'
      },
      navigate: () => null
    },
    ...obj
  };
}

test('CampaignAdmin navigates to the show view when there are no errors', async () => {
  const navigate = jest.fn();
  render(<CampaignAdmin {...makeProps({
    router: {
      ...makeProps().router,
      navigate
    }
  })}
  />);
  const loader = await screen.findByTestId('test-form-builder-loader');
  // There is is an onClick handler on the mock FormBuilderLoaderComponent that acts as a proxy for onSubmit()
  // The click event is only wrapped in a setTimeout so that it's fired a tick later which allows the mockResponse to be
  // written after the click. This mean that the test reads sequentially.
  setTimeout(() => fireEvent.click(loader));
  mockResponse = {
    errors: [],
    record: {
      id: 1
    }
  };
  await screen.findByTestId('test-breadcrumb');
  expect(navigate).toBeCalledWith('/campaigns/set/1/show');
});

test('CampaignAdmin detects errors in errors property', async () => {
  const navigate = jest.fn();
  render(<CampaignAdmin {...makeProps({
    router: {
      ...makeProps().router,
      navigate
    }
  })}
  />);
  const loader = await screen.findByTestId('test-form-builder-loader');
  setTimeout(() => fireEvent.click(loader));
  mockResponse = {
    errors: [
      { value: 'error' },
    ],
    record: {
      id: 1
    }
  };
  await screen.findByTestId('test-breadcrumb');
  expect(navigate).not.toBeCalled();
});

test('CampaignAdmin detects errors global messages property', async () => {
  const navigate = jest.fn();
  render(<CampaignAdmin {...makeProps({
    router: {
      ...makeProps().router,
      navigate
    }
  })}
  />);
  const loader = await screen.findByTestId('test-form-builder-loader');
  setTimeout(() => fireEvent.click(loader));
  mockResponse = {
    errors: [],
    state: {
      messages: [
        { value: 'error' },
      ]
    },
    record: {
      id: 1
    }
  };
  await screen.findByTestId('test-breadcrumb');
  expect(navigate).not.toBeCalled();
});

test('CampaignAdmin detects no errors in global messages property', async () => {
  const navigate = jest.fn();
  render(<CampaignAdmin {...makeProps({
    router: {
      ...makeProps().router,
      navigate
    }
  })}
  />);
  const loader = await screen.findByTestId('test-form-builder-loader');
  setTimeout(() => fireEvent.click(loader));
  mockResponse = {
    errors: [],
    state: {
      messages: []
    },
    record: {
      id: 1
    }
  };
  await screen.findByTestId('test-breadcrumb');
  expect(navigate).toBeCalledWith('/campaigns/set/1/show');
});

test('CampaignAdmin detects errors in field state fields messages', async () => {
  const navigate = jest.fn();
  render(<CampaignAdmin {...makeProps({
    router: {
      ...makeProps().router,
      navigate
    }
  })}
  />);
  const loader = await screen.findByTestId('test-form-builder-loader');
  setTimeout(() => fireEvent.click(loader));
  mockResponse = {
    errors: [],
    state: {
      fields: [
        { name: 'ID' },
        { name: 'Title', message: 'bad' },
      ],
    },
    record: {
      id: 1
    }
  };
  await screen.findByTestId('test-breadcrumb');
  expect(navigate).not.toBeCalled();
});

test('CampaignAdmin detects no errors in field state fields messages', async () => {
  const navigate = jest.fn();
  render(<CampaignAdmin {...makeProps({
    router: {
      ...makeProps().router,
      navigate
    }
  })}
  />);
  const loader = await screen.findByTestId('test-form-builder-loader');
  setTimeout(() => fireEvent.click(loader));
  mockResponse = {
    errors: [],
    state: {
      fields: [
        { name: 'ID' },
        { name: 'Title' },
      ],
    },
    record: {
      id: 1
    }
  };
  await screen.findByTestId('test-breadcrumb');
  expect(navigate).toBeCalledWith('/campaigns/set/1/show');
});
