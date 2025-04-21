import { useTheme } from '../../lib/context/ThemeContext';
export default function Footer({
    companyName = "Company Name",
    links = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" }
    ],
    variant = "default" // default, minimal, colored
  }) {
    const { palette } = useTheme();
    const variants = {
      default: "bg-gray-100 text-gray-700",
      minimal: "bg-white text-gray-600 border-t",
      colored: "bg-indigo-900 text-white"
    };
  
    const currentYear = new Date().getFullYear();
    
    return (
      <footer style={{ backgroundColor: palette.dark }} className={` py-8`}>
        <div className="container mx-auto px-4" style={{ color: palette.light }}>
          {variant !== 'minimal' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">{companyName}</h3>
                <p className="mb-4">Creating amazing digital experiences.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {links.slice(0, 3).map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="hover:underline">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                  {links.slice(3).map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="hover:underline">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className={`${variant === 'minimal' ? '' : 'border-t pt-6'} text-center`}>
            <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }