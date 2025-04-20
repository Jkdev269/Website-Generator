/**
 * Utility functions for parsing website generation form data
 */

/**
 * Analyzes the website type and returns appropriate components and structure
 * @param {string} websiteType - The type of website to be generated
 * @returns {Object} Components and sections appropriate for this type of website
 */
export function analyzeWebsiteType(websiteType) {
    const baseComponents = ['Header', 'Footer', 'Navigation'];
    
    switch (websiteType) {
      case 'portfolio':
        return {
          components: [
            ...baseComponents,
            'Hero',
            'ProjectsGrid',
            'About',
            'Skills',
            'ContactForm',
            'Testimonials',
          ],
          structure: {
            home: ['Hero', 'ProjectsGrid', 'Skills', 'Testimonials'],
            about: ['About', 'Skills'],
            contact: ['ContactForm'],
            projects: ['ProjectsGrid'],
          },
          description: 'A portfolio website to showcase your work and skills',
        };
      
      case 'business':
        return {
          components: [
            ...baseComponents,
            'Hero',
            'Services',
            'Features',
            'Testimonials',
            'Team',
            'Pricing',
            'FAQ',
            'CallToAction',
            'ContactForm',
          ],
          structure: {
            home: ['Hero', 'Services', 'Features', 'Testimonials', 'CallToAction'],
            about: ['About', 'Team'],
            services: ['Services', 'Features', 'Pricing'],
            contact: ['ContactForm'],
            faq: ['FAQ'],
          },
          description: 'A business website to promote your company and services',
        };
      
      case 'blog':
        return {
          components: [
            ...baseComponents,
            'Hero',
            'FeaturedPosts',
            'PostGrid',
            'Categories',
            'Newsletter',
            'AuthorBio',
            'Comments',
          ],
          structure: {
            home: ['Hero', 'FeaturedPosts', 'PostGrid', 'Newsletter'],
            about: ['About', 'AuthorBio'],
            contact: ['ContactForm'],
            blog: ['PostGrid', 'Categories'],
          },
          description: 'A blog website to share your thoughts and content',
        };
      
      case 'ecommerce':
        return {
          components: [
            ...baseComponents,
            'Hero',
            'ProductGrid',
            'FeaturedProducts',
            'Categories',
            'Cart',
            'Checkout',
            'ProductDetail',
            'Reviews',
            'RelatedProducts',
          ],
          structure: {
            home: ['Hero', 'FeaturedProducts', 'Categories'],
            products: ['ProductGrid', 'Categories'],
            cart: ['Cart'],
            checkout: ['Checkout'],
            productDetail: ['ProductDetail', 'Reviews', 'RelatedProducts'],
            contact: ['ContactForm'],
          },
          description: 'An e-commerce website to sell products online',
        };
      
      case 'landing':
        return {
          components: [
            ...baseComponents,
            'Hero',
            'Features',
            'Benefits',
            'Testimonials',
            'Pricing',
            'FAQ',
            'CallToAction',
            'Newsletter',
          ],
          structure: {
            home: ['Hero', 'Features', 'Benefits', 'Testimonials', 'Pricing', 'FAQ', 'CallToAction', 'Newsletter'],
          },
          description: 'A landing page to promote a specific product or service',
        };
      
      default:
        return {
          components: baseComponents,
          structure: {
            home: ['Hero'],
            about: ['About'],
            contact: ['ContactForm'],
          },
          description: 'A basic website',
        };
    }
  }
  
  /**
   * Determines the page structure based on the selected pages
   * @param {Array} selectedPages - Array of page names selected by the user
   * @param {Object} websiteTypeStructure - Default structure for the website type
   * @returns {Object} The structure of pages to be generated
   */
  export function determinePagesStructure(selectedPages, websiteTypeStructure) {
    const structure = {};
    
    // Always include home page
    if (websiteTypeStructure.home) {
      structure.home = websiteTypeStructure.home;
    }
    
    // Add other selected pages
    selectedPages.forEach(page => {
      if (page !== 'home' && websiteTypeStructure[page]) {
        structure[page] = websiteTypeStructure[page];
      }
    });
    
    // If the pages selected don't have a predefined structure, add basic components
    selectedPages.forEach(page => {
      if (!structure[page]) {
        structure[page] = [page.charAt(0).toUpperCase() + page.slice(1)];
      }
    });
    
    return structure;
  }
  
  /**
   * Extracts color palette based on the selected theme
   * @param {string} colorTheme - The color theme selected by the user
   * @returns {Object} Color palette object with color variables
   */
  export function extractColorPalette(colorTheme) {
    const palettes = {
      blue: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#2563EB',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#EFF6FF',
        dark: '#1E3A8A',
      },
      green: {
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#059669',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#ECFDF5',
        dark: '#065F46',
      },
      purple: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#7C3AED',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#F3F4F6',
        dark: '#5B21B6',
      },
      red: {
        primary: '#EF4444',
        secondary: '#F87171',
        accent: '#DC2626',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#FEF2F2',
        dark: '#991B1B',
      },
      orange: {
        primary: '#F59E0B',
        secondary: '#FBBF24',
        accent: '#D97706',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#FEF3C7',
        dark: '#92400E',
      },
      neutral: {
        primary: '#6B7280',
        secondary: '#9CA3AF',
        accent: '#4B5563',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#F3F4F6',
        dark: '#374151',
      },
    };
    
    return palettes[colorTheme] || palettes.blue;
  }
  
  /**
   * Generate typography settings based on website type
   * @param {string} websiteType - The type of website to be generated
   * @returns {Object} Typography settings for the website
   */
  export function generateTypographySettings(websiteType) {
    const baseSettings = {
      headingFont: "'Inter', sans-serif",
      bodyFont: "'Inter', sans-serif",
      baseSize: '16px',
    };
    
    switch (websiteType) {
      case 'portfolio':
        return {
          ...baseSettings,
          headingFont: "'Montserrat', sans-serif",
          bodyFont: "'Open Sans', sans-serif",
        };
      
      case 'business':
        return {
          ...baseSettings,
          headingFont: "'Raleway', sans-serif",
          bodyFont: "'Source Sans Pro', sans-serif",
        };
      
      case 'blog':
        return {
          ...baseSettings,
          headingFont: "'Playfair Display', serif",
          bodyFont: "'Lora', serif",
        };
      
      case 'ecommerce':
        return {
          ...baseSettings,
          headingFont: "'Poppins', sans-serif",
          bodyFont: "'Roboto', sans-serif",
        };
      
      case 'landing':
        return {
          ...baseSettings,
          headingFont: "'Montserrat', sans-serif",
          bodyFont: "'Roboto', sans-serif",
        };
      
      default:
        return baseSettings;
    }
  }
  
  /**
   * Analyze additional details for custom requirements
   * @param {string} additionalDetails - Additional details provided by the user
   * @returns {Object} Extracted custom requirements
   */
  export function analyzeAdditionalDetails(additionalDetails) {
    const customRequirements = {
      features: [],
      styles: {},
      content: {},
    };
    
    if (!additionalDetails) {
      return customRequirements;
    }
    
    // Extract features based on keywords
    const featureKeywords = [
      { keyword: "contact form", feature: "ContactForm" },
      { keyword: "subscription", feature: "Newsletter" },
      { keyword: "newsletter", feature: "Newsletter" },
      { keyword: "testimonial", feature: "Testimonials" },
      { keyword: "gallery", feature: "Gallery" },
      { keyword: "slideshow", feature: "Carousel" },
      { keyword: "carousel", feature: "Carousel" },
      { keyword: "faq", feature: "FAQ" },
      { keyword: "pricing", feature: "Pricing" },
      { keyword: "team", feature: "Team" },
      { keyword: "blog", feature: "Blog" },
      { keyword: "social media", feature: "SocialLinks" },
      { keyword: "map", feature: "Map" },
      { keyword: "video", feature: "VideoPlayer" },
      { keyword: "search", feature: "SearchBar" },
      { keyword: "dark mode", feature: "DarkMode" },
      { keyword: "light mode", feature: "LightMode" },
      { keyword: "chat", feature: "ChatWidget" },
      { keyword: "animation", feature: "Animations" },
    ];
    
    featureKeywords.forEach(({ keyword, feature }) => {
      if (additionalDetails.toLowerCase().includes(keyword)) {
        customRequirements.features.push(feature);
      }
    });
    
    // Extract style preferences
    if (additionalDetails.toLowerCase().includes("minimalist") || 
        additionalDetails.toLowerCase().includes("minimal")) {
      customRequirements.styles.minimalist = true;
    }
    
    if (additionalDetails.toLowerCase().includes("modern")) {
      customRequirements.styles.modern = true;
    }
    
    if (additionalDetails.toLowerCase().includes("traditional") || 
        additionalDetails.toLowerCase().includes("classic")) {
      customRequirements.styles.traditional = true;
    }
    
    if (additionalDetails.toLowerCase().includes("bold")) {
      customRequirements.styles.bold = true;
    }
    
    if (additionalDetails.toLowerCase().includes("professional")) {
      customRequirements.styles.professional = true;
    }
    
    if (additionalDetails.toLowerCase().includes("playful") || 
        additionalDetails.toLowerCase().includes("fun")) {
      customRequirements.styles.playful = true;
    }
    
    // Extract content preferences
    if (additionalDetails.toLowerCase().includes("about section") || 
        additionalDetails.toLowerCase().includes("about me")) {
      customRequirements.content.about = true;
    }
    
    if (additionalDetails.toLowerCase().includes("contact information") || 
        additionalDetails.toLowerCase().includes("contact info")) {
      customRequirements.content.contactInfo = true;
    }
    
    if (additionalDetails.toLowerCase().includes("portfolio") || 
        additionalDetails.toLowerCase().includes("projects")) {
      customRequirements.content.projects = true;
    }
    
    if (additionalDetails.toLowerCase().includes("services")) {
      customRequirements.content.services = true;
    }
    
    return customRequirements;
  }
  
  /**
   * Main function to parse the form data and generate website specifications
   * @param {Object} formData - User form input data
   * @returns {Object} Parsed website specifications
   */
  export function parseWebsiteRequirements(formData) {
    // Analyze website type to get components and structure
    const websiteTypeAnalysis = analyzeWebsiteType(formData.websiteType);
    
    // Determine pages structure
    const pagesStructure = determinePagesStructure(
      formData.pages, 
      websiteTypeAnalysis.structure
    );
    
    // Extract color palette
    const colorPalette = extractColorPalette(formData.colorTheme);
    
    // Generate typography settings
    const typography = generateTypographySettings(formData.websiteType);
    
    // Analyze additional details
    const customRequirements = analyzeAdditionalDetails(formData.additionalDetails);
    
    // Combine all data into website specifications
    return {
      name: formData.websiteName,
      type: formData.websiteType,
      description: websiteTypeAnalysis.description,
      pages: pagesStructure,
      components: [...new Set([
        ...websiteTypeAnalysis.components,
        ...customRequirements.features
      ])],
      styles: {
        colors: colorPalette,
        typography: typography,
        customStyles: customRequirements.styles
      },
      content: customRequirements.content,
      originalPrompt: formData.additionalDetails,
    };
  }