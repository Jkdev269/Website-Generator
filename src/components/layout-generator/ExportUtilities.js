// component/layout-generator/ExportUtilities.js

import ReactDOMServer from 'react-dom/server';

/**
 * Renders a React component to HTML string
 * @param {JSX.Element} component - React component to render
 * @returns {string} - HTML string
 */
export const renderToHTML = (component) => {
  return ReactDOMServer.renderToStaticMarkup(component);
};

/**
 * Creates a complete HTML document
 * @param {string} title - Page title
 * @param {string} body - HTML body content
 * @param {string} cssPath - Path to CSS file
 * @returns {string} - Complete HTML document
 */
export const createHTMLDocument = (title, body, cssPath = '/styles.css') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link href="${cssPath}" rel="stylesheet">
    </head>
    <body>
      ${body}
    </body>
    </html>
  `;
};

export default { renderToHTML, createHTMLDocument };