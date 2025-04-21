import { useTheme } from '../../lib/context/ThemeContext';

export default function Hero({
  title = "Welcome to Our Website",
  subtitle = "We help you create amazing digital experiences",
  buttonText = "Get Started",
  buttonLink = "#",
  backgroundImage = "",
  variant = "default"
}) {
  const { palette } = useTheme();

  const baseClasses = "py-20 md:py-28";
  const variants = {
    default: `${baseClasses} bg-white text-gray-800`,
    centered: `${baseClasses} bg-white text-center`,
    minimal: `${baseClasses} bg-transparent border-b`,
    image: `${baseClasses} text-white`
  };

  const backgroundStyle = backgroundImage && variant === 'image' ? {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  return (
    <section
      className={variants[variant]}
      style={{ backgroundColor: palette.background }}
    >
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl ${variant === 'centered' ? 'mx-auto text-center' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: palette.primary }}>{title}</h1>
          <p className="text-xl mb-8" style={{ color: palette.accent }}>{subtitle}</p>
          <a style={{ backgroundColor: palette.dark,color:palette.light }}
            href={buttonLink}
            className={`inline-block px-6 py-3 rounded-md font-medium ${
              variant === 'image' ? 'bg-white text-gray-900' : 'bg-indigo-600 text-white'
            } hover:opacity-90 transition-opacity`}
            
          >
            {buttonText }
          </a>
        </div>
      </div>
    </section>
  );
}
