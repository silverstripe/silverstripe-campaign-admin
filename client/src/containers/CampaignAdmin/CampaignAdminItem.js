import React, { Component } from 'react';
import i18n from 'i18n';
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
    const numReferTo = (
      this.props.item._links &&
      this.props.item._links.references &&
      this.props.item._links.references.length
    );

    return numReferTo || 0;
  }

  /**
   * @return integer
   */
  getNumReferredBy() {
    const numReferredBy = (
      this.props.item._links &&
      this.props.item._links.referenced_by &&
      this.props.item._links.referenced_by.length
    );

    return numReferredBy || 0;
  }

  /**
   * @return string
   */
  getReferToTooltipText() {
    const numReferTo = this.getNumReferTo();
    return i18n.sprintf(
      i18n._t('CampaignAdmin.LINKED_TO', 'Requires %s item(s)'),
      formatWrittenNumber(numReferTo)
    );
  }

  /**
   * @return string
   */
  getReferredByTooltipText() {
    const numReferredBy = this.getNumReferredBy();

    return i18n.sprintf(
      i18n._t('CampaignAdmin.LINKED_FROM', 'Required by %s item(s)'),
      formatWrittenNumber(numReferredBy)
    );
  }

  renderLinks() {
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
    if ((this.props.selected && numReferTo + numReferredBy > 0) || this.props.isLinked) {
      const linksClasses = [
        'list-group-item__info',
        'campaign-admin__item-links',
        this.props.isLinked ?
          'campaign-admin__item-links--is-linked' :
          'campaign-admin__item-links--has-links',
      ];

      links = (
        <div className={linksClasses.join(' ')}>
          <span id={`campaign-tooltip-${this.props.item.ID}`}>
            <span className="campaign-admin__item-links__number">
              {numReferTo + numReferredBy}
            </span>
            <span className="font-icon-link" />
          </span>
          <UncontrolledTooltip
            placement="left"
            target={`campaign-tooltip-${this.props.item.ID}`}
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
    const badge = {};
    const item = this.props.item;
    const campaign = this.props.campaign;

    // @todo customise these status messages for already-published changesets

    // Change badge. If the campaign has been published,
    // don't apply a badge at all
    if (campaign.State === 'open') {
      switch (item.ChangeType) {
        case 'created':
          badge.className = 'badge badge-warning list-group-item__status';
          badge.Title = i18n._t('CampaignAdmin.DRAFT', 'Draft');
          break;
        case 'modified':
          badge.className = 'badge badge-warning list-group-item__status';
          badge.Title = i18n._t('CampaignAdmin.MODIFIED', 'Modified');
          break;
        case 'deleted':
          badge.className = 'badge badge-error list-group-item__status';
          badge.Title = i18n._t('CampaignAdmin.REMOVED', 'Removed');
          break;
        case 'none':
        default:
          badge.className = 'badge badge-success list-group-item__status';
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
            <span className={badge.className}>{badge.Title}</span>
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
};

export default CampaignAdminItem;
