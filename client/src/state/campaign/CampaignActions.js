/* global window */
import RECORD_ACTION_TYPES from 'state/records/RecordsActionTypes';
import * as toastsActions from 'state/toasts/ToastsActions';
import i18n from 'i18n';
import ACTION_TYPES from './CampaignActionTypes';

export function setShowMessage(show, storage = window.localStorage) {
  storage.setItem('campaign.showMessage', show);
  return {
    type: ACTION_TYPES.SET_SHOW_MESSAGE,
    payload: { show },
  };
}

/**
 * Set selected changeset item
 *
 * @param {number} changeSetItemId ID of changesetitem in the currently visible changeset
 * @return {object}
 */
export function selectChangeSetItem(changeSetItemId) {
  return {
    type: ACTION_TYPES.SET_CAMPAIGN_SELECTED_CHANGESETITEM,
    payload: { changeSetItemId },
  };
}

/**
 * Show specified campaign set
 *
 * @param {number} campaignId ID of the Campaign to show.
 * @param {string} view The view mode to display the Campaign in.
 * @return {function}
 */
export function showCampaignView(campaignId, view) {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.SET_CAMPAIGN_ACTIVE_CHANGESET,
      payload: { campaignId, view },
    });
  };
}

/**
 * Publish a campaign and all its items
 *
 * @param {Function} publishApi See lib/Backend
 * @param {string} recordType
 * @param {number} campaignId
 * @return {Object}
 */
export function publishCampaign(publishApi, recordType, campaignId) {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.PUBLISH_CAMPAIGN_REQUEST,
      payload: { campaignId },
    });

    publishApi({ id: campaignId })
      .then((data) => {
        dispatch({
          type: ACTION_TYPES.PUBLISH_CAMPAIGN_SUCCESS,
          payload: { campaignId },
        });
        dispatch({
          type: RECORD_ACTION_TYPES.FETCH_RECORD_SUCCESS,
          payload: { recordType, data },
        });
        const message = i18n._t(
          'CampaignAdmin.PUBLISH_SUCCESS',
          'Published "%s" successfully.'
        );
        dispatch(toastsActions.success(i18n.sprintf(message, data.Name)));
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.PUBLISH_CAMPAIGN_FAILURE,
          payload: { error },
        });

        const message = typeof error === 'string'
          ? error
          : i18n._t('CampaignAdmin.PUBLISH_FAIL', 'Campaign could not be published.');
        dispatch(toastsActions.error(message));
      });
  };
}

/**
 * Set new campaign
 *
 * @param {Number|null} itemId
 * @return {Object}
 */
export function setNewItem(itemId) {
  return {
    type: ACTION_TYPES.SET_NEW_CAMPAIGN,
    payload: { newItem: itemId },
  };
}

/**
 * Delete a campaign item
 *
 * @param {Function} removeCampaignItemApi See lib/Backend
 * @param {string} recordType
 * @param {number} campaignId
 * @return {Object}
 */
export function removeCampaignItem(removeItemApi, campaignId, itemId) {
  return (dispatch) => {
    dispatch({
      type: ACTION_TYPES.REMOVE_CAMPAIGN_ITEM_REQUEST,
      payload: { campaignId, itemId },
    });

    return removeItemApi({ id: campaignId, itemId })
      .then(() => {
        dispatch({
          type: ACTION_TYPES.REMOVE_CAMPAIGN_ITEM_SUCCESS,
          payload: { campaignId, itemId },
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.REMOVE_CAMPAIGN_ITEM_FAILURE,
          payload: { error },
        });
      });
  };
}
