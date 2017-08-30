/* global jest, describe, beforeEach, it, expect */

jest.mock('react-bootstrap-ss');
jest.mock('lib/Backend');

import { CampaignAdminBase } from '../CampaignAdmin';

describe('CampaignAdminItem', () => {
  describe('detectErrors', () => {
    let admin = null;
    beforeEach(() => {
      admin = new CampaignAdminBase({
        sectionConfig: {
          publishEndpoint: {
            url: '/',
            method: 'get',
          },
        },
        securityId: null,
      });
    });
    it('detects errors in errors property', () => {
      const result = admin.detectErrors({
        errors: [
          { value: 'error' },
        ],
      });
      expect(result).toBe(true);
    });

    it('detects no errors in errors property', () => {
      const result = admin.detectErrors({
        errors: [],
      });
      expect(result).toBe(false);
    });

    it('detects errors in global messages property', () => {
      const result = admin.detectErrors({
        state: {
          messages: [
            { value: 'error' },
          ],
        },
      });
      expect(result).toBe(true);
    });

    it('detects no errors in global messages property', () => {
      const result = admin.detectErrors({
        state: {
          messages: [],
        },
      });
      expect(result).toBe(true);
    });

    it('detects errors in field state field messages', () => {
      const result = admin.detectErrors({
        state: {
          fields: [
            { name: 'ID' },
            {
              name: 'Title',
              message: { value: 'error' },
            },
          ],
        },
      });
      expect(result).toBe(true);
    });

    it('detects no errors in field state fields messages', () => {
      const result = admin.detectErrors({
        state: {
          fields: [
            { name: 'ID' },
            { name: 'Title' },
          ],
        },
      });
      expect(result).toBe(false);
    });
  });
});
