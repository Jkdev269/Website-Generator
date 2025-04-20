const layoutMapping = {
  portfolio: 'PortfolioLayout',
  business: 'BusinessLayout',
  blog: 'BlogLayout',
  basic: 'BasicLayout'
};

const componentMapping = {
  header: 'Header',
  footer: 'Footer',
  hero: 'Hero',
  features: 'Features',
  contact: 'ContactForm',
  gallery: 'Gallery',
  testimonials: 'Testimonials',
  pricing: 'Pricing',
  blog: 'BlogSection'
};

/**
 * Helper to capitalize first letter of a string
 * @param {String} str 
 * @returns {String}
 */
function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Serialize a JS object or array to a JSX prop string
 * @param {any} value 
 * @returns {String}
 */
function serializeProp(value) {
  if (typeof value === 'string') {
    // Escape quotes inside string
    const escaped = value.replace(/"/g, '"');
    return `"${escaped}"`;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    return `{${value}}`;
  } else if (Array.isArray(value) || typeof value === 'object') {
    return `{${JSON.stringify(value)}}`;
  } else {
    return `{${String(value)}}`;
  }
}

/**
 * Generate props string for JSX component from an object
 * @param {Object} propsObj 
 * @returns {String}
 */
function generatePropsString(propsObj) {
  if (!propsObj || typeof propsObj !== 'object') return '';
  return Object.entries(propsObj).map(([key, val]) => {
    return `${key}=${serializeProp(val)}`;
  }).join(' ');
}

/**
 * Generate layout props string based on promptData and websiteType
 * @param {Object} promptData 
 * @returns {String} props string for layout component
 */
export function generateLayoutProps(promptData) {
  const websiteType = promptData.websiteType || 'basic';
  switch (websiteType) {
    case 'portfolio': {
      const props = {
        name: promptData.name || promptData.title || 'John Doe',
        profession: promptData.profession || 'Web Developer & Designer',
        bio: promptData.bio || 'I create beautiful websites and digital experiences.',
        heroImage: promptData.heroImage || '/placeholder/1600/900',
        galleryImages: promptData.galleryImages || [
          { url: "/placeholder/600/400", alt: "Project 1", caption: "Project 1" },
          { url: "/placeholder/600/400", alt: "Project 2", caption: "Project 2" },
          { url: "/placeholder/600/400", alt: "Project 3", caption: "Project 3" },
          { url: "/placeholder/600/400", alt: "Project 4", caption: "Project 4" },
          { url: "/placeholder/600/400", alt: "Project 5", caption: "Project 5" },
          { url: "/placeholder/600/400", alt: "Project 6", caption: "Project 6" }
        ],
        testimonials: promptData.testimonials || [
          {
            quote: "Working with John was an absolute pleasure. His attention to detail is remarkable.",
            author: "Jane Smith",
            position: "CEO, Design Agency",
            avatar: "/placeholder/60/60"
          },
          {
            quote: "John delivered beyond our expectations. I would highly recommend his services.",
            author: "Mike Johnson",
            position: "Marketing Director",
            avatar: "/placeholder/60/60"
          }
        ],
        contactFormProps: promptData.contactFormProps || {},
        headerProps: promptData.headerProps || {},
        footerProps: promptData.footerProps || {}
      };
      return generatePropsString(props);
    }
    case 'business': {
      const props = {
        companyName: promptData.companyName || promptData.title || 'Business Co.',
        tagline: promptData.tagline || 'We help businesses grow and succeed',
        headerProps: promptData.headerProps || {},
        heroProps: promptData.heroProps || {},
        featuresProps: promptData.featuresProps || {},
        testimonialsProps: promptData.testimonialsProps || {},
        pricingProps: promptData.pricingProps || {},
        contactFormProps: promptData.contactFormProps || {},
        footerProps: promptData.footerProps || {}
      };
      return generatePropsString(props);
    }
    case 'blog': {
      const props = {
        blogName: promptData.blogName || promptData.title || 'The Blog',
        tagline: promptData.tagline || 'News, Tips, and Insights',
        latestPosts: promptData.latestPosts || [],
        categories: promptData.categories || [
          { name: "Technology", count: 12 },
          { name: "Design", count: 8 },
          { name: "Business", count: 10 },
          { name: "Marketing", count: 6 }
        ],
        headerProps: promptData.headerProps || {},
        heroProps: promptData.heroProps || {},
        blogSectionProps: promptData.blogSectionProps || {},
        featuredPostsProps: promptData.featuredPostsProps || {},
        contactFormProps: promptData.contactFormProps || {},
        footerProps: promptData.footerProps || {}
      };
      return generatePropsString(props);
    }
    default:
      return '';
  }
}

/**
 * Generate layout JSX based on parsed prompt data
 * @param {Object} promptData - Parsed data from user prompt
 * @returns {String} JSX code as string
 */
export function generateLayout(promptData) {
  const { websiteType, pages, colorTheme } = promptData;
  
  // Determine which layout template to use
  const layoutType = layoutMapping[websiteType] || layoutMapping.basic;
  
  // Generate props for the layout based on prompt data
  const layoutProps = generateLayoutProps(promptData);
  
  // Generate the JSX
  return `
import ${layoutType} from '../templates/${layoutType}';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>${promptData.title || 'Generated Website'}</title>
        <meta name="description" content="${promptData.description || 'Generated with Next.js Website Generator'}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <${layoutType} ${layoutProps} />
    </>
  );
}
  `;
}

/**
 * Generate individual page based on page type and prompt data
 * @param {String} pageName - Name of the page
 * @param {Object} promptData - Parsed data from user prompt
 * @returns {String} JSX code as string for the page
 */
export function generatePage(pageName, promptData) {
  const { websiteType, colorTheme } = promptData;
  const layoutType = layoutMapping[websiteType] || layoutMapping.basic;
  
  // Generate page content based on page name
  let pageContent = '';
  
  switch(pageName.toLowerCase()) {
    case 'about':
      pageContent = generateAboutPage(promptData);
      break;
    case 'contact':
      pageContent = generateContactPage(promptData);
      break;
    case 'services':
      pageContent = generateServicesPage(promptData);
      break;
    case 'blog':
      pageContent = generateBlogPage(promptData);
      break;
    default:
      pageContent = `<div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">${capitalizeFirstLetter(pageName)}</h1>
        <p>Content for ${pageName} page goes here.</p>
      </div>`;
  }
  
  return `
import ${layoutType} from '../../templates/${layoutType}';
import Head from 'next/head';

export default function ${capitalizeFirstLetter(pageName)}Page() {
  return (
    <>
      <Head>
        <title>${capitalizeFirstLetter(pageName)} | ${promptData.title || 'Generated Website'}</title>
        <meta name="description" content="${promptData.description || `${capitalizeFirstLetter(pageName)} page`}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <${layoutType}>
        ${pageContent}
      </${layoutType}>
    </>
  );
}
  `;
}

// Helper functions for generating page content
function generateAboutPage(promptData) {
  return `
<div className="container mx-auto px-4 py-16">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
    <div className="prose prose-lg mx-auto">
      <p>
        Welcome to ${promptData.title || 'our website'}. We are dedicated to providing the best service to our customers.
      </p>
      <p>
        Our story begins with a passion for excellence and a commitment to quality. Founded in 2023, we have quickly
        established ourselves as leaders in our field.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
      <p>
        Our mission is to deliver exceptional products/services that enhance our customers' lives while maintaining
        the highest standards of quality and customer satisfaction.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
      <p>
        Our team consists of dedicated professionals with extensive experience in their respective fields.
        We work collaboratively to ensure that every project meets and exceeds expectations.
      </p>
    </div>
  </div>
</div>
  `;
}

function generateContactPage(promptData) {
  return `
<div className="container mx-auto px-4 py-16">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="mb-6">We'd love to hear from you. Please fill out the form below or contact us directly using the information provided.</p>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-full mr-4">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Phone</h3>
              <p className="text-gray-600">(123) 456-7890</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-full mr-4">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Email</h3>
              <p className="text-gray-600">info@example.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 p-2 rounded-full mr-4">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Address</h3>
              <p className="text-gray-600">123 Main Street<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
            <input type="text" id="subject" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea id="message" rows="5" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
          </div>
          
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
  `;
}

function generateServicesPage(promptData) {
  return `
<div className="container mx-auto px-4 py-16">
  <h1 className="text-4xl font-bold mb-12 text-center">Our Services</h1>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    <div className="p-6 border rounded-lg">
      <div className="text-3xl mb-4">💻</div>
      <h2 className="text-2xl font-bold mb-4">Web Development</h2>
      <p className="text-gray-600 mb-6">We create responsive, fast-loading websites that provide a great user experience across all devices.</p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Custom website design
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          E-commerce development
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Responsive frameworks
        </li>
      </ul>
    </div>
    
    <div className="p-6 border rounded-lg">
      <div className="text-3xl mb-4">📱</div>
      <h2 className="text-2xl font-bold mb-4">Mobile Applications</h2>
      <p className="text-gray-600 mb-6">We build native and cross-platform mobile applications for iOS and Android devices.</p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Native iOS & Android apps
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Cross-platform solutions
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          App maintenance & updates
        </li>
      </ul>
    </div>
    
    <div className="p-6 border rounded-lg">
      <div className="text-3xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold mb-4">SEO Services</h2>
      <p className="text-gray-600 mb-6">We improve your website's visibility in search engines to drive more organic traffic.</p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Keyword research
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          On-page optimization
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Link building strategies
        </li>
      </ul>
    </div>
  </div>
  
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
    <a href="/contact" className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors">
      Contact Us Today
    </a>
  </div>
</div>
  `;
}

function generateBlogPage(promptData) {
  return `
<div className="container mx-auto px-4 py-16">
  <h1 className="text-4xl font-bold mb-12 text-center">Our Blog</h1>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <article className="border rounded-lg overflow-hidden">
      <img src="/api/placeholder/600/400" alt="Blog post" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Getting Started with Web Development</h2>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-4">April 15, 2025</span>
          <span>By John Doe</span>
        </div>
        <p className="text-gray-600 mb-4">Learn the basics of web development and how to build your first website.</p>
        <a href="/blog/getting-started" className="text-indigo-600 font-medium hover:underline">
          Read More →
        </a>
      </div>
    </article>
    
    <article className="border rounded-lg overflow-hidden">
      <img src="/api/placeholder/600/400" alt="Blog post" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">10 Tips for Better SEO</h2>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-4">April 10, 2025</span>
          <span>By Jane Smith</span>
        </div>
        <p className="text-gray-600 mb-4">Improve your website's search engine rankings with these proven tips.</p>
        <a href="/blog/seo-tips" className="text-indigo-600 font-medium hover:underline">
          Read More →
        </a>
      </div>
    </article>
    
    <article className="border rounded-lg overflow-hidden">
      <img src="/api/placeholder/600/400" alt="Blog post" className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">The Future of Web Design</h2>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-4">April 5, 2025</span>
          <span>By Mike Johnson</span>
        </div>
        <p className="text-gray-600 mb-4">Explore the upcoming trends that will shape the future of web design.</p>
        <a href="/blog/future-web-design" className="text-indigo-600 font-medium hover:underline">
          Read More →
        </a>
      </div>
    </article>
  </div>
</div>
  `;
}
