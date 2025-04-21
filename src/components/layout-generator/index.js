// component/layout-generator/index.js

import BasicLayout from '../templates/BasicLayout';
import BlogLayout from '../templates/BlogLayout';
import BusinessLayout from '../templates/BusinessLayout';
import PortfolioLayout from '../templates/PortfolioLayout';
import { createThemeFromColors } from './ThemeManager';

// Component imports
import Header from '../core/Header';
import Footer from '../core/Footer';
import Hero from '../core/Hero';
import Gallery from '../core/Gallery';
import BlogSection from '../core/BlogSection';
import Feature from '../core/Features';
import Pricing from '../core/Pricing';
import Testimonials from '../core/Testimonials';
import ContactForm from '../core/ContactForm';

/**
 * Generates a layout based on the website type and configuration
 * @param {Object} config - Website configuration from user input
 * @returns {JSX.Element} - The appropriate layout with components
 */
export const generateLayout = (config) => {
  const { websiteType, pages, colors, companyName } = config;
  const colorTheme = createThemeFromColors(colors);
  
  // Select the appropriate layout based on website type
  switch (websiteType) {
    case 'blog':
      return (
        <BlogLayout 
        colorTheme={colorTheme}
          header={<Header companyName={companyName} pages={pages} colorTheme={colorTheme} />}
          content={renderBlogContent(config,colorTheme)}
          footer={<Footer companyName={companyName} colorTheme={colorTheme} />}
        />
      );
    
    case 'portfolio':
      return (
        <PortfolioLayout 
          colorTheme={colorTheme}
          header={<Header companyName={companyName} pages={pages} colorTheme={colorTheme} />}
          content={renderPortfolioContent(config,colorTheme)}
          footer={<Footer companyName={companyName} colorTheme={colorTheme} />}
        />
      );
    
    case 'business':
      return (
        <BusinessLayout 
          colorTheme={colorTheme}
          header={<Header companyName={companyName} pages={pages} colorTheme={colorTheme} />}
          content={renderBusinessContent(config,colorTheme)}
          footer={<Footer companyName={companyName} colorTheme={colorTheme} />}
        />
      );
    
    default:
      return (
        <BasicLayout 
          colorTheme={colorTheme}
          header={<Header companyName={companyName} pages={pages} colorTheme={colorTheme} />}
          content={renderBasicContent(config,colorTheme)}
          footer={<Footer companyName={companyName} colorTheme={colorTheme} />}
        />
      );
  }
};

// Helper functions to render content for different website types
const renderBlogContent = (config,colorTheme) => {
  return (
    <>
      <Hero 
        title={`${config.companyName} Blog`}
        subtitle="Latest thoughts, ideas and insights"
        colorTheme={colorTheme}
     
      />
      <BlogSection 
        posts={generateSampleBlogPosts(3)}
        colorTheme={colorTheme}
        

      />
      {config.pages.includes('contact') && 
        <ContactForm colorTheme={colorTheme} />
      }
    </>
  );
};

const renderPortfolioContent = (config,colorTheme) => {
  return (
    <>
      <Hero 
        title={`${config.companyName}`}
        subtitle="My creative portfolio"
        colorTheme={colorTheme}
      />
      <Gallery 
        items={generateSamplePortfolioItems(6)}
        colorTheme={colorTheme}
      />
      {config.pages.includes('testimonials') && 
        <Testimonials colorTheme={colorTheme} />
      }
      {config.pages.includes('contact') && 
        <ContactForm colorTheme={colorTheme} />
      }
    </>
  );
};

const renderBusinessContent = (config,colorTheme) => {
  return (
    <>
      <Hero 
        title={config.companyName}
        subtitle="Your trusted business partner"
        colorTheme={colorTheme}
        // colorTheme={colorThemes}
      />
      <Feature 
        features={generateBusinessFeatures()}
        colorTheme={colorTheme}
        // colorTheme={colorThemes}
      />
      {config.pages.includes('pricing') && 
        <Pricing colorTheme={colorTheme} />
      }
      {config.pages.includes('testimonials') && 
        <Testimonials colorTheme={colorTheme} />
      }
      {config.pages.includes('contact') && 
        <ContactForm colorTheme={colorTheme} />
      }
    </>
  );
};

const renderBasicContent = (config,colorTheme) => {
  return (
    <>
      <Hero 
        title={config.companyName}
        subtitle="Welcome to our website"
        colorTheme={colorTheme}
      />
      {config.pages.includes('contact') && 
        <ContactForm colorTheme={colorTheme} />
      }
    </>
  );
};

// Helper functions to generate sample content
const generateSampleBlogPosts = (count) => {
  return Array(count).fill().map((_, index) => ({
    id: index + 1,
    title: `Blog Post ${index + 1}`,
    excerpt: 'This is a sample blog post excerpt. Click to read more...',
    date: new Date().toLocaleDateString(),
    imageUrl: `/placeholder-${index + 1}.jpg`
  }));
};

const generateSamplePortfolioItems = (count) => {
  return Array(count).fill().map((_, index) => ({
    id: index + 1,
    title: `Project ${index + 1}`,
    description: 'This is a sample project description.',
    imageUrl: `/portfolio-${index + 1}.jpg`,
    category: ['design', 'development', 'branding'][index % 3]
  }));
};

const generateBusinessFeatures = () => {
  return [
    {
      title: 'Feature 1',
      description: 'Description of your amazing feature 1',
      icon: 'icon-feature-1'
    },
    {
      title: 'Feature 2',
      description: 'Description of your amazing feature 2',
      icon: 'icon-feature-2'
    },
    {
      title: 'Feature 3',
      description: 'Description of your amazing feature 3',
      icon: 'icon-feature-3'
    }
  ];
};

/**
 * Generates a specific page based on page name and website configuration
 * @param {string} pageName - Name of the page to generate (e.g., 'about', 'contact')
 * @param {Object} config - Website configuration
 * @returns {JSX.Element} - The appropriate page component
 */
export const generatePage = (pageName, config) => {
  const { colors, companyName } = config;
  const colorTheme = createThemeFromColors(colors);

  
  switch (pageName.toLowerCase()) {
    case 'about':
      return (
        <div>
          <h1>About {companyName}</h1>
          <p>This is the about page content.</p>
        </div>
      );
    
    case 'contact':
      return <ContactForm colorTheme={colorTheme} />;
    
    case 'blog':
      return <BlogSection posts={generateSampleBlogPosts(6)} colorTheme={colorTheme} />;
    
    case 'portfolio':
      return <Gallery items={generateSamplePortfolioItems(9)} colorTheme={colorTheme} />;

    // Add more page types as needed
    
    default:
      return (
        <div>
          <h1>{pageName}</h1>
          <p>This is the {pageName} page content.</p>
        </div>
      );
  }
};