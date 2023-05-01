/* global jest, test, describe, it, expect */

import React from 'react';
import IntroScreen from '../IntroScreen';
import { render } from '@testing-library/react';

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
