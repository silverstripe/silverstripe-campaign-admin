import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import CONSTANTS from 'constants/index';

const noop = () => null;

class IntroScreen extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    this.props.onClose(e);
  }

  renderContent() {
    const button = CONSTANTS.infoScreen.callToAction;
    const links = CONSTANTS.infoScreen.links;
    return (
      <div className="flexbox-area-grow campaign-info__content">
        <h3>
          {i18n._t('CampaignAdmin.InfoScreenHeader', 'How do campaigns work?')}
        </h3>
        <p>
          {i18n._t('CampaignAdmin.InfoScreenContent', 'Campaigns allow multiple users to publish large amounts of content (pages, files, etc.) all at once from one place.')}
        </p>
        <div className="campaign-info__links">
          {links.map((item) => (
            <a key={item.text} href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</a>
          ))
          }
        </div>
        <div className="campaign-info__content-buttons">
          {button &&
          <a className="btn btn-outline-secondary" href={button.link} target="_blank" rel="noopener noreferrer">
            {button.text}
          </a>
          }
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="fill-width campaign-info">
        <div className="campaign-info__icon">
          <span className="font-icon-white-question icon btn--icon-xl btn--no-text" />
        </div>
        {this.renderContent()}
        <div className="campaign-info__banner-image" />
        <div className="campaign-info__buttons">
          <a
            className="btn campaign-info__close btn--no-text font-icon-cancel btn--icon-xl"
            onClick={this.handleClose}
            role="button"
            aria-label={i18n._t('CampaignAdmin.HELP_HIDE', 'Hide help')}
            tabIndex={0}
          />
        </div>
      </div>
    );
  }
}

IntroScreen.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

IntroScreen.defaultProps = {
  show: false,
  onClose: noop,
};

export default IntroScreen;
