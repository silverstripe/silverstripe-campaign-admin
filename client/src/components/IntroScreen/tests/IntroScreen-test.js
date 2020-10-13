/* global jest, describe, it, expect */

import React from 'react';
import IntroScreen from '../IntroScreen';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';

Enzyme.configure({ adapter: new Adapter() });

const errorSpy = jest.spyOn(global.console, 'error');
const warnSpy = jest.spyOn(global.console, 'warn');

const props = {
  show: true,
  onClose: () => {},
};

describe('IntroScreen', () => {
  describe('render()', () => {
    beforeEach(() => {
      errorSpy.mockClear();
      warnSpy.mockClear();
    });

    it('renders', () => {
      mount(
        <IntroScreen {...props} />
      );
      expect(errorSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('renders when show is false', () => {
      const props2 = { ...props, show: false };
      mount(
        <IntroScreen {...props2} />
      );
      expect(errorSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });
});
