// component/layout-generator/ContentConfiguration.js

export const templateConfigurations = {
    blog: {
      components: ['Header', 'Hero', 'BlogSection', 'Footer'],
      sidebarComponents: ['RecentPosts', 'Categories']
    },
    portfolio: {
      components: ['Header', 'Hero', 'Gallery', 'Testimonials', 'ContactForm', 'Footer']
    },
    business: {
      components: ['Header', 'Hero', 'Feature', 'Pricing', 'Testimonials', 'ContactForm', 'Footer']
    },
    basic: {
      components: ['Header', 'Hero', 'ContactForm', 'Footer']
    }
  };
  
  export default templateConfigurations;