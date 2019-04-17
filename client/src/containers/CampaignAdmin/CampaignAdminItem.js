import React, { Component } from 'react';
import i18n from 'i18n';
import { inject } from 'lib/Injector';
import { UncontrolledTooltip } from 'reactstrap';
import formatWrittenNumber from 'lib/formatWrittenNumber';
import PropTypes from 'prop-types';

/**
 * Describes an individual campaign item
 */
class CampaignAdminItem extends Component {
  /**
   * @return integer
   */
  getNumReferTo() {
    const { item } = this.props;
    const numReferTo = (
      item._links &&
      item._links.references &&
      item._links.references.length
    );

    return numReferTo || 0;
  }

  /**
   * @return integer
   */
  getNumReferredBy() {
    const { item } = this.props;
    const numReferredBy = (
      item._links &&
      item._links.referenced_by &&
      item._links.referenced_by.length
    );

    return numReferredBy || 0;
  }

  /**
   * @return string
   */
  getReferToTooltipText() {
    const numReferTo = this.getNumReferTo();
    return i18n.inject(
      i18n._t('CampaignAdmin.LINKED_TO', 'Requires {number} item(s)'),
      { number: formatWrittenNumber(numReferTo) }
    );
  }

  /**
   * @return string
   */
  getReferredByTooltipText() {
    const numReferredBy = this.getNumReferredBy();

    return i18n.inject(
      i18n._t('CampaignAdmin.LINKED_FROM', 'Required by {number} item(s)'),
      { number: formatWrittenNumber(numReferredBy) }
    );
  }

  renderLinks() {
    const { isLinked, selected, item: { ID: itemID } } = this.props;

    const numReferTo = this.getNumReferTo();
    const numReferredBy = this.getNumReferredBy();

    const tooltipTexts = [];
    if (numReferTo > 0) {
      tooltipTexts.push(this.getReferToTooltipText());
    }
    if (numReferredBy > 0) {
      tooltipTexts.push(i18n.sprintf(
        tooltipTexts.length === 0 ?
          this.getReferredByTooltipText() :
          this.getReferredByTooltipText().toLocaleLowerCase(),
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
            <span className="font-icon-link" />
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
  }

  render() {
    let thumbnail = null;
    const badge = {
      status: 'none',
    };
    const { campaign, item, VersionedBadgeComponent } = this.props;

    // @todo customise these status messages for already-published changesets

    // Change badge. If the campaign has been published,
    // don't apply a badge at all
    if (campaign.State === 'open') {
      switch (item.ChangeType) {
        case 'created':
          badge.status = 'draft';
          badge.Title = i18n._t('CampaignAdmin.DRAFT', 'Draft');
          break;
        case 'modified':
          badge.status = 'modified';
          badge.Title = i18n._t('CampaignAdmin.MODIFIED', 'Modified');
          break;
        case 'deleted':
          badge.status = 'removed';
          badge.Title = i18n._t('CampaignAdmin.REMOVED', 'Removed');
          break;
        case 'none':
        default:
          badge.status = 'live';
          badge.Title = i18n._t('CampaignAdmin.NO_CHANGES', 'No changes');
          break;
      }
    }

    const links = this.renderLinks();

    if (item.Thumbnail) {
      thumbnail = (
        <span className="list-group-item__thumbnail">
          <img alt={item.Title} src={item.Thumbnail} />
        </span>
      );
    }

    return (
      <div className="fill-width">
        {thumbnail}
        <div className="list-group-item__details">
          <h4 className="list-group-item__heading" title={item.Title}>{item.Title}</h4>
          {links}
          {badge.className && badge.Title &&
            <VersionedBadgeComponent
              extraClass="list-group-item__status"
              status={badge.status}
              message={badge.Title}
            />
          }
        </div>
      </div>
    );
  }
}

CampaignAdminItem.propTypes = {
  campaign: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isLinked: PropTypes.bool,
  selected: PropTypes.bool,
  VersionedBadgeComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export { CampaignAdminItem as Component };

export default inject(
  ['VersionedBadge'],
  (VersionedBadgeComponent) => ({
    VersionedBadgeComponent,
  }),
  () => 'CampaignAdmin.CampaignAdmin.ListItem'
)(CampaignAdminItem);
