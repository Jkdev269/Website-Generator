import React, { createContext, useContext, useState } from 'react';
import { parseWebsiteRequirements } from '../utils/promptParser';

// Create context
const WebsiteContext = createContext();

// Custom hook to use the website context
export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}

// Provider component
export function WebsiteProvider({ children }) {
  // State for website specifications
  const [websiteSpecs, setWebsiteSpecs] = useState(null);
  
  // State for tracking generation progress
  const [generationStatus, setGenerationStatus] = useState({
    isGenerating: false,
    currentStep: null,
    progress: 0,
    error: null,
  });
  
  // State for generated website files
  const [generatedFiles, setGeneratedFiles] = useState({
    html: {},
    css: {},
    js: {},
    assets: {},
  });
  
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
  
  // Function to generate website files based on specifications
  const generateWebsite = async (specs = websiteSpecs) => {
    if (!specs) {
      throw new Error('Website specifications are required');
    }
    
    try {
      setGenerationStatus({
        isGenerating: true,
        currentStep: 'generating',
        progress: 30,
        error: null,
      });
      
      // In Day 4-5, we'll implement the actual generation logic here
      // For now, we'll just simulate the process with a timeout
      
      // Simulate file generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGenerationStatus({
        isGenerating: true,
        currentStep: 'generated',
        progress: 100,
        error: null,
      });
      
      // For now, let's return dummy files
      const dummyFiles = {
        html: {
          'index.html': '<!DOCTYPE html><html><head><title>Generated Website</title></head><body><h1>Home Page</h1></body></html>',
        },
        css: {
          'styles.css': 'body { font-family: sans-serif; }',
        },
        js: {
          'main.js': 'console.log("Generated website");',
        },
        assets: {},
      };
      
      setGeneratedFiles(dummyFiles);
      
      return dummyFiles;
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
  
  // Function to reset the state
  const resetWebsite = () => {
    setWebsiteSpecs(null);
    setGenerationStatus({
      isGenerating: false,
      currentStep: null,
      progress: 0,
      error: null,
    });
    setGeneratedFiles({
      html: {},
      css: {},
      js: {},
      assets: {},
    });
  };
  
  // Context value
  const value = {
    websiteSpecs,
    generationStatus,
    generatedFiles,
    processFormData,
    generateWebsite,
    resetWebsite,
  };
  
  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
}