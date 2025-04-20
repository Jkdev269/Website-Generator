/**
 * Utility functions for validating and enhancing form data
 */

/**
 * Validates the website generation form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} Validation results with errors if any
 */
export function validateFormData(formData) {
    const errors = {};
    
    // Validate website type
    if (!formData.websiteType) {
      errors.websiteType = 'Please select a website type';
    }
    
    // Validate website name
    if (!formData.websiteName || formData.websiteName.trim() === '') {
      errors.websiteName = 'Please enter a website name';
    } else if (formData.websiteName.length > 50) {
      errors.websiteName = 'Website name must be 50 characters or less';
    }
    
    // Validate pages
    if (!formData.pages || formData.pages.length === 0) {
      errors.pages = 'Please select at least one page';
    }
    
    // Validate color theme
    if (!formData.colorTheme) {
      errors.colorTheme = 'Please select a color theme';
    }
    
    // Return validation result
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
  
  /**
   * Enhances form data with defaults and derived values
   * @param {Object} formData - The form data to enhance
   * @returns {Object} Enhanced form data
   */
  export function enhanceFormData(formData) {
    const enhanced = { ...formData };
    
    // Ensure home page is always included
    if (!enhanced.pages.includes('home')) {
      enhanced.pages = ['home', ...enhanced.pages];
    }
    
    // Add timestamps
    enhanced.createdAt = new Date().toISOString();
    
    // Generate a unique ID for the project
    enhanced.projectId = generateProjectId(enhanced.websiteName);
    
    return enhanced;
  }
  
  /**
   * Generate a simple project ID based on the website name
   * @param {string} websiteName - The name of the website
   * @returns {string} A project ID
   */
  function generateProjectId(websiteName) {
    const timestamp = Date.now().toString(36);
    const nameSlug = websiteName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 15);
    
    return `${nameSlug}-${timestamp}`;
  }