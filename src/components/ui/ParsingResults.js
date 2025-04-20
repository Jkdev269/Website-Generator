import React from 'react';

export default function ParsingResults({ websiteSpecs }) {
  if (!websiteSpecs) {
    return <div>No specifications available</div>;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Structure Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            {Object.entries(websiteSpecs.pages).map(([pageName, components]) => (
              <div key={pageName}>
                <h4 className="font-semibold capitalize">{pageName} Page</h4>
                <ul className="text-sm text-gray-600 ml-4">
                  {components.map((component, index) => (
                    <li key={index}>• {component}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Style Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Color Theme</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(websiteSpecs.styles.colors).map(([name, color]) => (
                  <div key={name} className="flex items-center gap-1">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm text-gray-600">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold">Typography</h4>
              <ul className="text-sm text-gray-600 mt-2">
                <li>Headings: {websiteSpecs.styles.typography.headingFont}</li>
                <li>Body: {websiteSpecs.styles.typography.bodyFont}</li>
              </ul>
            </div>
          </div>
          
          {Object.keys(websiteSpecs.styles.customStyles || {}).length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Custom Style Preferences</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.keys(websiteSpecs.styles.customStyles).map((style) => (
                  <span key={style} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {style}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {websiteSpecs.content && Object.keys(websiteSpecs.content).length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Content Analysis</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="text-sm text-gray-600">
              {Object.keys(websiteSpecs.content).map((contentType) => (
                <li key={contentType} className="capitalize">• {contentType.replace(/([A-Z])/g, ' $1')}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}