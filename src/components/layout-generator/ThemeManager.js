// // component/layout-generator/ThemeManager.js

// // Predefined color themes
// export const colorThemes = {
//     blue: {
//       primary: '#3B82F6',
//       secondary: '#93C5FD',
//       accent: '#1E40AF',
//       text: '#1E293B',
//       background: '#F8FAFC'
//     },
//     green: {
//       primary: '#10B981',
//       secondary: '#6EE7B7',
//       accent: '#047857',
//       text: '#1E293B',
//       background: '#F8FAFC'
//     },
//     purple: {
//       primary: '#8B5CF6',
//       secondary: '#C4B5FD',
//       accent: '#5B21B6',
//       text: '#1E293B',
//       background: '#F8FAFC'
//     },
//     red: {
//       primary: '#EF4444',
//       secondary: '#FCA5A5',
//       accent: '#B91C1C',
//       text: '#1E293B',
//       background: '#F8FAFC'
//     },
//     dark: {
//       primary: '#6B7280',
//       secondary: '#9CA3AF',
//       accent: '#374151',
//       text: '#F9FAFB',
//       background: '#1F2937'
//     }
//   };
  
//   /**
//    * Get CSS classes based on the selected color theme
//    * @param {string} themeName - Name of the theme (e.g., 'blue', 'green')
//    * @param {string} elementType - Type of element (e.g., 'button', 'heading')
//    * @returns {string} - Tailwind CSS classes
//    */
//   export const getThemeClasses = (themeName, elementType) => {
//     const theme = colorThemes[themeName] || colorThemes.blue;
    
//     switch (elementType) {
//       case 'button':
//         return `bg-[${theme.primary}] hover:bg-[${theme.accent}] text-white font-bold py-2 px-4 rounded`;
      
//       case 'heading':
//         return `text-[${theme.text}] font-bold`;
      
//       case 'section':
//         return `bg-[${theme.background}] p-6`;
  
//       case 'card':
//         return `bg-white shadow-md rounded-lg p-6 border border-[${theme.secondary}]`;
      
//       default:
//         return '';
//     }
//   };
  
//   export default colorThemes;


// component/layout-generator/ThemeManager.js

/**
 * Process user-selected colors into a usable theme
 * @param {Object} userColors - User selected colors (primary, secondary, etc.)
 * @returns {Object} - Processed theme with color values
 */
export const createThemeFromColors = (userColors) => {
  // Default fallback colors if user colors are incomplete
  const defaultColors = {
    primary: '#3B82F6',
    secondary: '#93C5FD',
    accent: '#1E40AF',
    text: '#1E293B',
    background: '#F8FAFC'
  };

  // Merge user colors with defaults
  const themeColors = {
    ...defaultColors,
    ...userColors
  };

  return themeColors;
};

/**
 * Get CSS classes or styles based on the user's color theme
 * @param {Object} theme - The color theme object
 * @param {string} elementType - Type of element (e.g., 'button', 'heading')
 * @returns {Object} - Style object to apply to the element
 */
export const getElementStyles = (theme, elementType) => {
  switch (elementType) {
    case 'button':
      return {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        borderColor:  '#3B82F6',
      };
    
    case 'heading':
      return {
        color:'#1E293B'
      };
    
    case 'section':
      return {
        backgroundColor:'#F8FAFC'
      };

    case 'card':
      return {
        backgroundColor: '#FFFFFF',
        borderColor: '#93C5FD'
      };
    
    case 'accent':
      return {
        color:'#1E40AF'
      };
      
    default:
      return {};
  }
};

export default { createThemeFromColors, getElementStyles };