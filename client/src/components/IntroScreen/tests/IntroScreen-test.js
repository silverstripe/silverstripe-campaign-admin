/* global jest, test, describe, it, expect */

import React from 'react';
import { render } from '@testing-library/react';
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
