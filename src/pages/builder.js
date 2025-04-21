import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { useWebsite } from '../lib/context/WebsiteContext';

export default function BuilderPage() {
  const router = useRouter();
  const { websiteSpecs, generatedWebsite } = useWebsite();
  const [currentPage, setCurrentPage] = useState('index');
  
  // If no generated website, redirect to generate page
  useEffect(() => {
    if (!generatedWebsite) {
      router.replace('/generate');
    }
  }, [generatedWebsite, router]);
  
  // If there is no generated website yet, show loading
  if (!generatedWebsite || !websiteSpecs) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading website builder...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get available pages
  const pages = Object.keys(generatedWebsite);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Website Builder</h1>
          
          <div className="flex space-x-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Save Progress
            </button>
            
            <button
              className="bg-black hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Download Website
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold mb-4">Pages</h3>
              <ul className="space-y-2">
                {pages.map((page) => (
                  <li key={page}>
                    <button
                      className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                        currentPage === page 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      <span className="capitalize">
                        {page === 'index' ? 'Home' : page}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <hr className="my-4" />
              
              <h3 className="text-lg font-bold mb-4">Components</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Drag components to add them to your page</p>
                <div className="space-y-2">
                  {websiteSpecs.components.map((component) => (
                    <div 
                      key={component}
                      className="bg-white border border-gray-200 p-2 rounded text-sm cursor-move hover:border-blue-400 transition-colors"
                    >
                      {component}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-gray-500 font-medium">
                  Editing: {currentPage === 'index' ? 'Home' : currentPage} Page
                </div>
              </div>
              
              <div className="min-h-[600px] p-4">
                {generatedWebsite[currentPage].content}
              </div>
            </div>
          </div>
          
          {/* Right sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-bold mb-4">Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Layout
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Default Layout</option>
                    <option>Two Column</option>
                    <option>Hero Layout</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="color" 
                      className="w-8 h-8 rounded border border-gray-300" 
                      value={websiteSpecs.styles.colors.background || '#FFFFFF'}
                    />
                    <input 
                      type="text" 
                      className="ml-3 flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary" 
                      value={websiteSpecs.styles.colors.background || '#FFFFFF'}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center">
                    <input 
                      type="color" 
                      className="w-8 h-8 rounded border border-gray-300" 
                      value={websiteSpecs.styles.colors.text || '#333333'}
                    />
                    <input 
                      type="text" 
                      className="ml-3 flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary" 
                      value={websiteSpecs.styles.colors.text || '#333333'}
                    />
                  </div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <h3 className="text-lg font-bold mb-4">SEO Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Title
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={
                      currentPage === 'index' 
                        ? websiteSpecs.name 
                        : `${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} - ${websiteSpecs.name}`
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    rows="3"
                    value={websiteSpecs.description || ''}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}