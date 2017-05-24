import React from 'react';
import SilverStripeComponent from 'lib/SilverStripeComponent';
import i18n from 'i18n';
import { Tooltip, OverlayTrigger } from 'react-bootstrap-ss';
import formatWrittenNumber from 'lib/formatWrittenNumber';

/**
 * Describes an individual campaign item
 */
class CampaignAdminItem extends SilverStripeComponent {

  /**
   * @return integer
   */
  getNumReferTo() {
    const numReferTo = (
      this.props.item.links &&
      this.props.item.links.refer_to &&
      this.props.item.links.refer_to.length
    );

    return numReferTo || 0;
  }

  /**
   * @return integer
   */
  getNumReferredBy() {
    const numReferredBy = (
      this.props.item.links &&
      this.props.item.links.referenced_by &&
      this.props.item.links.referenced_by.length
    );

    return numReferredBy || 0;
  }

  /**
   * @return string
   */
  getReferToTooltipText() {
    const numReferTo = this.getNumReferTo();

    const text = numReferTo < 2 ?
      i18n._t('CampaignAdmin.LINKED_TO_SINGULAR', 'Links to %s item') :
      i18n._t('CampaignAdmin.LINKED_TO_PLURAL', 'Links to %s items');

    return i18n.sprintf(text, formatWrittenNumber(numReferTo));
  }

  /**
   * @return string
   */
  getReferredByTooltipText() {
    const numReferredBy = this.getNumReferredBy();

    const text = numReferredBy < 2 ?
      i18n._t('CampaignAdmin.LINKED_FROM_SINGULAR', 'Linked to from %s item') :
      i18n._t('CampaignAdmin.LINKED_FROM_PLURAL', 'Linked to from %s items');

    return i18n.sprintf(text, formatWrittenNumber(numReferredBy));
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
          badge.className = 'label label-warning list-group-item__status';
          badge.Title = i18n._t('CampaignAdmin.DRAFT', 'Draft');
          break;
        case 'modified':
          badge.className = 'label label-warning list-group-item__status';
          badge.Title = i18n._t('CampaignAdmin.MODIFIED', 'Modified');
          break;
        case 'deleted':
          badge.className = 'label label-error list-group-item__status';
          badge.Title = i18n._t('CampaignAdmin.REMOVED', 'Removed');
          break;
        case 'none':
        default:
          badge.className = 'label label-success list-group-item__status';
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
          <h4 className="list-group-item__heading">{item.Title}</h4>
          {links}
          {badge.className && badge.Title &&
            <span className={badge.className}>{badge.Title}</span>
          }
        </div>
      </div>
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

    const tooltip = (<Tooltip id={`campaign-tooltip-${this.props.item.ID}`}>{
      tooltipTexts.join(', ')
    }</Tooltip>);

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
          <OverlayTrigger placement="left" overlay={tooltip}>
            <span>
              <span className="campaign-admin__item-links__number">
                {numReferTo + numReferredBy}
              </span>
              <span className="font-icon-link" />
            </span>
          </OverlayTrigger>
        </div>
      );
    }

    return links;
  }
}

CampaignAdminItem.propTypes = {
  campaign: React.PropTypes.object.isRequired,
  item: React.PropTypes.object.isRequired,
  isLinked: React.PropTypes.bool,
};

export default CampaignAdminItem;
