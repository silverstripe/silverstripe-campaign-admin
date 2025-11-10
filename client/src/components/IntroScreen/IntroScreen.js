import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import CONSTANTS from 'constants/index';

const noop = () => null;

const IntroScreen = ({
  show = false,
  onClose = noop,
  focusCloseButton = false,
}) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (focusCloseButton && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [focusCloseButton]);

  const handleClose = (e) => {
    onClose(e);
  };

  const renderContent = () => {
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
  };

  if (!show) {
    return null;
  }
  return (
    <div className="fill-width campaign-info" id="campaign-info">
      <div className="campaign-info__buttons">
        <button
          className="btn campaign-info__close btn--no-text font-icon-cancel btn--icon-xl"
          onClick={handleClose}
          aria-label={i18n._t('CampaignAdmin.HELP_HIDE', 'Hide help')}
          aria-expanded="true"
          aria-controls="campaign-info"
          ref={closeButtonRef}
        />
      </div>
      <div className="campaign-info__banner-image" />
      <div className="campaign-info__icon">
        <span className="font-icon-white-question icon btn--icon-xl btn--no-text" aria-hidden="true" />
      </div>
      {renderContent()}
    </div>
  );
};

IntroScreen.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  focusCloseButton: PropTypes.bool,
};

export default IntroScreen;
