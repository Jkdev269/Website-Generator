// component/layout-generator/ComponentMapper.js

import Header from '../core/Header';
import Footer from '../core/Footer';
import Hero from '../core/Hero';
import Gallery from '../core/Gallery';
import BlogSection from '../core/BlogSection';
import Feature from '../core/Feature';
import Pricing from '../core/Pricing';
import Testimonials from '../core/Testimonials';
import ContactForm from '../core/ContactForm';

const componentMap = {
  Header,
  Footer,
  Hero,
  Gallery,
  BlogSection,
  Feature,
  Pricing,
  Testimonials,
  ContactForm
};

export const getComponent = (componentName, props = {}) => {
  const Component = componentMap[componentName];
  if (!Component) {
    console.warn(`Component ${componentName} not found`);
    return null;
  }
  
  return <Component {...props} />;
};

export default componentMap;