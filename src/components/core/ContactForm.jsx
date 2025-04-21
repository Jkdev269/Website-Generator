import { useState } from 'react';
import { useTheme } from '../../lib/context/ThemeContext';
// import { extractColorPalette } from './path-to-your-utils'; // adjust path as needed

export default function ContactForm({
  title = "Contact Us",
  subtitle = "We'd love to hear from you",
  variant = "default" // default, card, minimal
}) {
  const {palette } = useTheme();
  // const palette = extractColorPalette(colorTheme);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };

  const variants = {
    default: "py-16",
    card: "py-16",
    minimal: "py-16"
  };

  return (
    <section className={variants[variant]} style={{ backgroundColor: palette.background }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ color: palette.primary }}>
              {title}
            </h2>
            <p className="text-xl" style={{ color: palette.text }}>
              {subtitle}
            </p>
          </div>

          <div
            className={variant === 'card' ? 'p-6 rounded-lg shadow-md' : ''}
            style={variant === 'card' ? { backgroundColor: '#fff' } : {}}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2" style={{ color: palette.text }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  style={{
                    borderColor: palette.accent,
                    backgroundColor: palette.light,
                    color: palette.text
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2" style={{ color: palette.text }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  style={{
                    borderColor: palette.accent,
                    backgroundColor: palette.light,
                    color: palette.text
                  }}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2" style={{ color: palette.text }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  style={{
                    borderColor: palette.accent,
                    backgroundColor: palette.light,
                    color: palette.text
                  }}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-md transition-colors"
                style={{
                  backgroundColor: isSubmitting ? palette.secondary : palette.primary,
                  color: '#fff',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div
                  className="mt-4 p-3 rounded-md"
                  style={{ backgroundColor: palette.light, color: palette.accent }}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
