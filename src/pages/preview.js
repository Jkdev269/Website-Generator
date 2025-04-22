import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { useWebsite } from '../lib/context/WebsiteContext';
import { generateLayout } from '../components/layout-generator';
import colorThemes from '../components/layout-generator/ThemeManager';

export default function PreviewPage() {
  const router = useRouter();
  const { websiteSpecs, generationStatus, generateWebsite ,setWebsiteSpecs } = useWebsite();
  const [previewContent, setPreviewContent] = useState(null);
  
  // If no website specs, redirect to generate page
  useEffect(() => {
    // Try to load from localStorage if context is empty
    if (!websiteSpecs) {
      const storedWebsiteSpecs = localStorage.getItem('websiteSpecs');
      if (storedWebsiteSpecs) {
        try {
          // Parse and set the website specs from localStorage
          const parsedSpecs = JSON.parse(storedWebsiteSpecs);
          setWebsiteSpecs(parsedSpecs); // This assumes setWebsiteSpecs is available from context
          return; // Exit early to prevent redirect
        } catch (error) {
          console.error('Error parsing stored website specs:', error);
        }
      }
      // Only redirect if we couldn't load from localStorage
      router.replace('/generate');
    } else {
      // Generate preview content when specs are available
      generatePreview();
    }
  }, [websiteSpecs, router]);
  
  // Generate preview content based on specs
  const generatePreview = () => {
    if (!websiteSpecs) return;
    
    // Transform websiteSpecs to the format expected by generateLayout
    const layoutConfig = {
      websiteType: websiteSpecs.type,
      pages: Object.keys(websiteSpecs.pages),
      // colorTheme: colorThemes,
      colors: websiteSpecs.styles.colors,
      companyName: websiteSpecs.name,
      components: websiteSpecs.components
    };
    
    // Generate the layout preview
    const layout = generateLayout(layoutConfig);
    setPreviewContent(layout);
  };
  
  // Handle continue button click
  const handleContinue = async () => {
    try {
      await generateWebsite();
      router.push('/builder');
    } catch (error) {
      console.error('Error generating website:', error);
    }
  };
  
  // If there are no website specs yet, show loading
  if (!websiteSpecs) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Website Preview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Website specs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{websiteSpecs.name}</h2>
                  <p className="text-gray-600 text-sm">{websiteSpecs.description}</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {websiteSpecs.type.charAt(0).toUpperCase() + websiteSpecs.type.slice(1)}
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-bold mb-2">Pages</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <ul className="space-y-1 text-sm">
                      {Object.keys(websiteSpecs.pages).map((page) => (
                        <li key={page} className="flex items-center">
                          <span className="bg-green-100 text-green-800 p-1 rounded mr-2 text-xs">✓</span>
                          <span className="capitalize">{page}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-bold mb-2">Components</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {websiteSpecs.components.map((component) => (
                        <span 
                          key={component}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              
                <div>
                  <h3 className="text-md font-bold mb-2">Color Palette</h3>
                  <div className="flex space-x-3 mb-4">
                    {Object.entries(websiteSpecs.styles.colors).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mb-1" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-xs text-gray-600">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => router.back()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  Edit Details
                </button>
                
                <button
                  onClick={handleContinue}
                  className={`
                    bg-gray-200 hover:bg-gray-300  text-gray-800 font-bold py-2 px-4 rounded-lg text-sm
                    transition-colors '}
                  `}
                  // disabled={generationStatus.isGenerating}
                >
                  {generationStatus.isGenerating ? 'Generating...' : 'Generate Website'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side - Live preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-gray-500 font-medium">
                  Preview: {websiteSpecs.name}
                </div>
              </div>
              
              <div className="h-[800px] overflow-y-auto border border-gray-100">
                {previewContent ? (
                  <div className="preview-container">
                    {previewContent}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 text-gray-500">Generating preview...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              This is a preview of how your website will look. The final version may vary slightly.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}