/* global jest, test, describe, it, expect, beforeEach, afterEach */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IntroScreen from '../IntroScreen';

test('IntroScreen renders when show is true', () => {
  const { container } = render(
    <IntroScreen {...{
      show: true,
      onClose: () => {},
    }}
    />
  );
  expect(container.querySelector('.campaign-info')).not.toBeNull();
});

test('IntroScreen does not render when show is false', () => {
  const { container } = render(
    <IntroScreen {...{
      show: false,
      onClose: () => {},
    }}
    />
  );
  expect(container.querySelector('.campaign-info')).toBeNull();
});

test('IntroScreen close button calls onClose handler', () => {
  const onClose = jest.fn();
  const { container } = render(
    <IntroScreen
      show
      onClose={onClose}
    />
  );
  const closeButton = container.querySelector('.campaign-info__close');
  fireEvent.click(closeButton);
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('IntroScreen close button passes event to onClose handler', () => {
  const onClose = jest.fn();
  const { container } = render(
    <IntroScreen
      show
      onClose={onClose}
    />
  );
  const closeButton = container.querySelector('.campaign-info__close');
  fireEvent.click(closeButton);
  expect(onClose.mock.calls[0][0]).toBeDefined();
  expect(onClose.mock.calls[0][0].type).toBe('click');
});

test('IntroScreen renders info section header', () => {
  render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(screen.getByText('How do campaigns work?')).not.toBeNull();
});

test('IntroScreen renders info section content text', () => {
  render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(screen.getByText(/Campaigns allow multiple users to publish large amounts of content/)).not.toBeNull();
});

test('IntroScreen renders banner image element', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(container.querySelector('.campaign-info__banner-image')).not.toBeNull();
});

test('IntroScreen renders help icon', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  const icon = container.querySelector('.font-icon-white-question');
  expect(icon).not.toBeNull();
  expect(icon.getAttribute('aria-hidden')).toBe('true');
});

test('IntroScreen close button has correct accessibility attributes', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  const closeButton = container.querySelector('.campaign-info__close');
  expect(closeButton.getAttribute('aria-label')).toBe('Hide help');
  expect(closeButton.getAttribute('aria-expanded')).toBe('true');
  expect(closeButton.getAttribute('aria-controls')).toBe('campaign-info');
});

test('IntroScreen close button has correct CSS classes', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  const closeButton = container.querySelector('.campaign-info__close');
  expect(closeButton.classList.contains('btn')).toBe(true);
  expect(closeButton.classList.contains('campaign-info__close')).toBe(true);
  expect(closeButton.classList.contains('btn--no-text')).toBe(true);
  expect(closeButton.classList.contains('font-icon-cancel')).toBe(true);
  expect(closeButton.classList.contains('btn--icon-xl')).toBe(true);
});

test('IntroScreen renders content container with correct class', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(container.querySelector('.campaign-info__content')).not.toBeNull();
});

test('IntroScreen renders flexbox-area-grow class on content', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  const content = container.querySelector('.campaign-info__content');
  expect(content.classList.contains('flexbox-area-grow')).toBe(true);
});

test('IntroScreen renders links container', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(container.querySelector('.campaign-info__links')).not.toBeNull();
});

test('IntroScreen renders content buttons container', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(container.querySelector('.campaign-info__content-buttons')).not.toBeNull();
});

test('IntroScreen main container has correct id', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  expect(container.querySelector('#campaign-info')).not.toBeNull();
});

test('IntroScreen renders with default props when not provided', () => {
  const { container } = render(<IntroScreen />);
  expect(container.querySelector('.campaign-info')).toBeNull();
});

test('IntroScreen has default onClose handler that does nothing', () => {
  const { container } = render(
    <IntroScreen show />
  );
  const closeButton = container.querySelector('.campaign-info__close');
  expect(() => {
    fireEvent.click(closeButton);
  }).not.toThrow();
});

test('IntroScreen close button is not focused by default', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
      focusCloseButton={false}
    />
  );
  const closeButton = container.querySelector('.campaign-info__close');
  expect(document.activeElement).not.toBe(closeButton);
});

test('IntroScreen renders header with h3 tag', () => {
  const { container } = render(
    <IntroScreen
      show
      onClose={() => {}}
    />
  );
  const heading = container.querySelector('.campaign-info__content h3');
  expect(heading).not.toBeNull();
});
