import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
// import Input from '../components/ui/Input';
import Input from '../components/ui/input'
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { validateFormData, enhanceFormData } from '../lib/utils/formValidator';
import { useWebsite } from '../lib/context/WebsiteContext';
import { useTheme } from '../lib/context/ThemeContext';

export default function GeneratePage() {
  const router = useRouter();
  const { setColorTheme } = useTheme();
  const { processFormData } = useWebsite();
  
  // Form state
  const [formData, setFormData] = useState({
    websiteType: '',
    websiteName: '',
    pages: [],
    colorTheme: '',
    additionalDetails: '',
  });

  // Error state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Website type options
  const websiteTypeOptions = [
    { value: 'portfolio', label: 'Portfolio / Personal Website' },
    { value: 'business', label: 'Business / Company Website' },
    { value: 'blog', label: 'Blog' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'landing', label: 'Landing Page' },
  ];

  // Page options
  const pageOptions = [
    { value: 'home', label: 'Home' },
    { value: 'about', label: 'About' },
    { value: 'services', label: 'Services' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'blog', label: 'Blog' },
    { value: 'contact', label: 'Contact' },
    { value: 'faq', label: 'FAQ' },
    { value: 'testimonials', label: 'Testimonials' },
  ];

  // Color theme options
  const colorThemeOptions = [
    { value: 'blue', label: 'Blue - Professional & Trustworthy' },
    { value: 'green', label: 'Green - Fresh & Eco-Friendly' },
    { value: 'purple', label: 'Purple - Creative & Luxurious' },
    { value: 'red', label: 'Red - Bold & Energetic' },
    { value: 'orange', label: 'Orange - Friendly & Confident' },
    { value: 'neutral', label: 'Neutral - Minimal & Elegant' },
  ];

  // // Handle input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
    
  //   // Clear error when field is modified
  //   if (errors[name]) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [name]: '',
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // When color theme changes, update the context
    if (name === 'colorTheme') {
      setColorTheme(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle multi-select changes (for pages)
  const handlePageSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prev) => ({
      ...prev,
      pages: selectedOptions,
    }));
    
    // Clear error when field is modified
    if (errors.pages) {
      setErrors((prev) => ({
        ...prev,
        pages: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateFormData(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Enhance form data with defaults and derived values
      const enhancedData = enhanceFormData(formData);
      
      // Process form data using our context
      const specs = await processFormData(enhancedData);
      
      // Navigate to the preview page
      router.push('/preview');
    } catch (error) {
      console.error('Error processing form data:', error);
      setErrors({
        form: 'An error occurred while processing your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Generate Your Website</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Select
              label="Website Type"
              name="websiteType"
              options={websiteTypeOptions}
              value={formData.websiteType}
              onChange={handleChange}
              required
              error={errors.websiteType}
            />
            
            <Input
              label="Website Name"
              name="websiteName"
              placeholder="My Awesome Website"
              value={formData.websiteName}
              onChange={handleChange}
              required
              error={errors.websiteName}
            />
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Pages <span className="text-red-500">*</span>
              </label>
              <select
                multiple
                name="pages"
                value={formData.pages}
                onChange={handlePageSelection}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                size={5}
              >
                {pageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple pages</p>
              {errors.pages && <p className="text-red-500 text-sm mt-1">{errors.pages}</p>}
            </div>
            
            <Select
              label="Color Theme"
              name="colorTheme"
              options={colorThemeOptions}
              value={formData.colorTheme}
              onChange={handleChange}
              required
              error={errors.colorTheme}
            />
            
            <Textarea
              label="Additional Details (Optional)"
              name="additionalDetails"
              placeholder="Describe any specific requirements or features you'd like for your website..."
              value={formData.additionalDetails}
              onChange={handleChange}
              rows={5}
            />
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  bg-gray-200 hover:bg-gray-300  text-gray-800 font-bold py-2 px-6 rounded-lg 
                  transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? 'Analyzing...' : 'Generate Website'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}