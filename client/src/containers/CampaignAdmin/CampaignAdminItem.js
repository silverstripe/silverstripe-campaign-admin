import React from 'react';
import i18n from 'i18n';
import { UncontrolledTooltip } from 'reactstrap';
import formatWrittenNumber from 'lib/formatWrittenNumber';
import PropTypes from 'prop-types';

/**
 * Describes an individual campaign item
 */
const CampaignAdminItem = ({
  campaign,
  item,
  isLinked,
  selected,
}) => {
  /**
   * @return integer
   */
  const getNumReferTo = () => {
    const numReferTo = (
      item._links &&
      item._links.references &&
      item._links.references.length
    );

    return numReferTo || 0;
  };

  /**
   * @return integer
   */
  const getNumReferredBy = () => {
    const numReferredBy = (
      item._links &&
      item._links.referenced_by &&
      item._links.referenced_by.length
    );

    return numReferredBy || 0;
  };

  /**
   * @return string
   */
  const getReferToTooltipText = () => {
    const numReferTo = getNumReferTo();
    return i18n.inject(
      i18n._t('CampaignAdmin.LINKED_TO', 'Requires {number} item(s)'),
      { number: formatWrittenNumber(numReferTo) }
    );
  };

  /**
   * @return string
   */
  const getReferredByTooltipText = () => {
    const numReferredBy = getNumReferredBy();

    return i18n.inject(
      i18n._t('CampaignAdmin.LINKED_FROM', 'Required by {number} item(s)'),
      { number: formatWrittenNumber(numReferredBy) }
    );
  };

  const renderLinks = () => {
    const { ID: itemID } = item;

    const numReferTo = getNumReferTo();
    const numReferredBy = getNumReferredBy();

    const tooltipTexts = [];
    if (numReferTo > 0) {
      tooltipTexts.push(getReferToTooltipText());
    }
    if (numReferredBy > 0) {
      tooltipTexts.push(i18n.sprintf(
        tooltipTexts.length === 0 ?
          getReferredByTooltipText() :
          getReferredByTooltipText().toLocaleLowerCase(),
        formatWrittenNumber(numReferredBy)
      ));
    }

    let links = null;
    if ((selected && numReferTo + numReferredBy > 0) || isLinked) {
      const linksClasses = [
        'list-group-item__info',
        'campaign-admin__item-links',
        isLinked ?
          'campaign-admin__item-links--is-linked' :
          'campaign-admin__item-links--has-links',
      ];

      links = (
        <div className={linksClasses.join(' ')}>
          <span id={`campaign-tooltip-${itemID}`}>
            <span className="campaign-admin__item-links__number">
              {numReferTo + numReferredBy}
            </span>
            <span className="font-icon-link" aria-hidden="true" />
          </span>
          <UncontrolledTooltip
            placement="left"
            target={`campaign-tooltip-${itemID}`}
          >
            {tooltipTexts.join(', ')}
          </UncontrolledTooltip>
        </div>
      );
    }

    return links;
  };

  let thumbnail = null;
  const badge = {};

  // Change badge. If the campaign has been published,
  // don't apply a badge at all
  if (campaign.State === 'open') {
    switch (item.ChangeType) {
      case 'created':
        badge.className = 'badge status-addedtodraft';
        badge.Title = i18n._t('CampaignAdmin.DRAFT', 'Draft');
        break;
      case 'modified':
        badge.className = 'badge status-modified';
        badge.Title = i18n._t('CampaignAdmin.MODIFIED', 'Modified');
        break;
      case 'deleted':
        badge.className = 'badge status-removedfromdraft';
        badge.Title = i18n._t('CampaignAdmin.REMOVED', 'Removed');
        break;
      case 'none':
      default:
        badge.className = 'badge list-group-item__status';
        badge.Title = i18n._t('CampaignAdmin.NO_CHANGES', 'No changes');
        break;
    }
  }

  const links = renderLinks();

  if (item.Thumbnail) {
    thumbnail = (
      <span className="list-group-item__thumbnail">
        <img alt={item.Title} src={item.Thumbnail} />
      </span>
    );
  }

  const title = item.Title ? item.Title : i18n._t('CampaignAdmin.UNTITLED', 'Untitled');

  return (
    <div className="fill-width">
      {thumbnail}
      <div className="list-group-item__details">
        <h4 className="list-group-item__heading" title={title}>{title}</h4>
        {links}
        {badge.className && badge.Title &&
          <span className={badge.className}>{badge.Title}</span>
        }
      </div>
    </div>
  );
};

CampaignAdminItem.propTypes = {
  campaign: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isLinked: PropTypes.bool,
  selected: PropTypes.bool,
};

export default CampaignAdminItem;
