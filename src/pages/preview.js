import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { useWebsite } from '../lib/context/WebsiteContext';

export default function PreviewPage() {
  const router = useRouter();
  const { websiteSpecs, generationStatus, generateWebsite } = useWebsite();
  
  // If no website specs, redirect to generate page
  useEffect(() => {
    if (!websiteSpecs) {
      router.replace('/generate');
    }
  }, [websiteSpecs, router]);
  
  // Handle continue button click
  const handleContinue = async () => {
    try {
      await generateWebsite();
      // In Day 4-5, we'll navigate to a builder page
      // For now, we'll just alert the user
      alert('Website generated! We will implement the live preview in the coming days.');
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Website Specifications</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{websiteSpecs.name}</h2>
              <p className="text-gray-600">{websiteSpecs.description}</p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
              {websiteSpecs.type.charAt(0).toUpperCase() + websiteSpecs.type.slice(1)}
            </div>
          </div>
          
          <hr className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Pages</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {Object.keys(websiteSpecs.pages).map((page) => (
                    <li key={page} className="flex items-center">
                      <span className="bg-green-100 text-green-800 p-1 rounded mr-2">✓</span>
                      <span className="capitalize">{page}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-3">Components</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {websiteSpecs.components.map((component) => (
                    <span 
                      key={component}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3">Color Palette</h3>
            <div className="flex space-x-4 mb-6">
              {Object.entries(websiteSpecs.styles.colors).map(([name, color]) => (
                <div key={name} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-2" 
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-xs text-gray-600">{name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3">Typography</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Heading Font</p>
                  <p className="font-bold">{websiteSpecs.styles.typography.headingFont}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Body Font</p>
                  <p className="font-bold">{websiteSpecs.styles.typography.bodyFont}</p>
                </div>
              </div>
            </div>
          </div>
          
          {websiteSpecs.originalPrompt && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-3">Additional Requirements</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{websiteSpecs.originalPrompt}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Back
          </button>
          
          <button
            onClick={handleContinue}
            className={`
              bg-primary hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg 
              transition-colors ${generationStatus.isGenerating ? 'opacity-70 cursor-not-allowed' : ''}
            `}
            disabled={generationStatus.isGenerating}
          >
            {generationStatus.isGenerating ? 'Generating...' : 'Continue to Website Generation'}
          </button>
        </div>
      </div>
    </Layout>
  );
}