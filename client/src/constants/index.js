const url = 'https://userhelp.silverstripe.org/en/4/creating_pages_and_content/campaigns/';

export default {
  infoScreen: {
    // populate this with link in format `{ text: 'My text', link: 'https://somewhere.test' }`
    links: [
      { text: 'Creating a new campaign', link: `${url}#creating-a-new-campaign` },
      { text: 'Editing details/settings', link: `${url}#editing-details-settings` },
      { text: 'Adding items to a campaign', link: `${url}#adding-items-to-a-campaign` },
      { text: 'Managing items in a campaign', link: `${url}#managing-items-in-a-campaign` },
      { text: 'Publishing a campaign', link: `${url}#publishing-a-campaign` },
    ],
    // call to action button link in format `{ text: 'My text', link: 'https://somewhere.test' }`
    callToAction: null,
  },
};
