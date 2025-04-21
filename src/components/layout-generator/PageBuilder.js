// component/layout-generator/PageBuilder.js

import { generateLayout, generatePage } from './index';

/**
 * Builds a complete website based on configuration
 * @param {Object} config - Website configuration
 * @returns {Object} - Object containing HTML for each page
 */
export const buildWebsite = (config) => {
  const { pages } = config;
  const website = {};
  
  // Generate homepage
  website['index'] = {
    title: `${config.companyName} - Home`,
    content: generateLayout(config)
  };
  
  // Generate additional pages
  pages.forEach(pageName => {
    if (pageName.toLowerCase() !== 'home') {
      website[pageName.toLowerCase()] = {
        title: `${config.companyName} - ${pageName}`,
        content: generatePage(pageName, config)
      };
    }
  });
  
  return website;
};

export default buildWebsite;