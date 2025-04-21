import React, { createContext, useContext, useState, useCallback } from 'react';
import { parseWebsiteRequirements } from '../utils/promptParser';
import { buildWebsite } from '../../components/layout-generator/PageBuilder';

// Create the context
const WebsiteContext = createContext();

// Context provider component
export function WebsiteProvider({ children }) {
  
// Function to process form data and generate website specifications
const processFormData = (formData) => {
  try {
    setGenerationStatus({
      isGenerating: true,
      currentStep: 'parsing',
      progress: 10,
      error: null,
    });
    
    // Parse the form data to extract website requirements
    const specs = parseWebsiteRequirements(formData);
    
    // Update state with parsed specifications
    setWebsiteSpecs(specs);
    
    setGenerationStatus({
      isGenerating: true,
      currentStep: 'analyzed',
      progress: 20,
      error: null,
    });
    
    return specs;
  } catch (error) {
    setGenerationStatus({
      isGenerating: false,
      currentStep: null,
      progress: 0,
      error: error.message,
    });
    
    throw error;
  }
};
  // State for website specifications
  const [websiteSpecs, setWebsiteSpecs] = useState(null);
  
  // State for generation status
  const [generationStatus, setGenerationStatus] = useState({
    isGenerating: false,
    progress: 0,
    error: null
  });
  
  // State for generated website
  const [generatedWebsite, setGeneratedWebsite] = useState(null);
  
  // Function to save website specifications
  const saveWebsiteSpecs = useCallback((specs) => {
    setWebsiteSpecs(specs);
  }, []);
  
  // Function to generate the website from specs
  const generateWebsite = useCallback(async () => {
    if (!websiteSpecs) {
      throw new Error('No website specifications available');
    }
    
    try {
      setGenerationStatus({
        isGenerating: true,
        progress: 0,
        error: null
      });
      
      // Transform specs for the builder
      const config = {
        websiteType: websiteSpecs.type,
        pages: Object.keys(websiteSpecs.pages),
        colorTheme: websiteSpecs.styles.colors.primary || '#3B82F6',
        companyName: websiteSpecs.name,
        components: websiteSpecs.components
      };
      
      // Simulate progress updates
      const updateProgress = (progress) => {
        setGenerationStatus(prev => ({
          ...prev,
          progress
        }));
      };
      
      // Mock progress updates
      updateProgress(10);
      await new Promise(resolve => setTimeout(resolve, 500));
      updateProgress(30);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate website using the builder
      const website = buildWebsite(config);
      
      updateProgress(70);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save the generated website
      setGeneratedWebsite(website);
      
      updateProgress(100);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setGenerationStatus({
        isGenerating: false,
        progress: 100,
        error: null
      });
      
      return website;
    } catch (error) {
      setGenerationStatus({
        isGenerating: false,
        progress: 0,
        error: error.message
      });
      throw error;
    }
  }, [websiteSpecs]);
  
  // Context value
  const value = {
    websiteSpecs,
    processFormData,
    saveWebsiteSpecs,
    generationStatus,
    generateWebsite,
    generatedWebsite
  };
  
  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
}

// Custom hook to use the context
export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}



