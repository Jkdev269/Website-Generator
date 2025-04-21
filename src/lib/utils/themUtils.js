/**
 * Extracts color palette based on the selected theme
 * @param {string} colorTheme - The color theme selected by the user
 * @returns {Object} Color palette object with color variables
 */
export function extractColorPalette(colorTheme) {
    const palettes = {
      blue: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#2563EB',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#EFF6FF',
        dark: '#1E3A8A',
      },
      green: {
        primary: '#10B981',
        secondary: '#34D399',
        accent: '#059669',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#ECFDF5',
        dark: '#065F46',
      },
      purple: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#7C3AED',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#F3F4F6',
        dark: '#5B21B6',
      },
      red: {
        primary: '#EF4444',
        secondary: '#F87171',
        accent: '#DC2626',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#FEF2F2',
        dark: '#991B1B',
      },
      orange: {
        primary: '#F59E0B',
        secondary: '#FBBF24',
        accent: '#D97706',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#FEF3C7',
        dark: '#92400E',
      },
      neutral: {
        primary: '#6B7280',
        secondary: '#9CA3AF',
        accent: '#4B5563',
        text: '#1F2937',
        background: '#F9FAFB',
        light: '#F3F4F6',
        dark: '#374151',
      },
    };
      
    return palettes[colorTheme] || palettes.blue;
  }