import Header from '../core/Header';
import Footer from '../core/Footer';
import Hero from '../core/Hero';
import Features from '../core/Features';
import Testimonials from '../core/Testimonials';
import Pricing from '../core/Pricing';
import ContactForm from '../core/ContactForm';

export default function BusinessLayout({
  companyName = "Business Co.",
  tagline = "We help businesses grow and succeed",
  headerProps = {},
  heroProps = {},
  featuresProps = {},
  testimonialsProps = {},
  pricingProps = {},
  contactFormProps = {},
  footerProps = {}
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={companyName}
        navItems={[
          { name: "Home", href: "/" },
          { name: "Features", href: "#features" },
          { name: "Testimonials", href: "#testimonials" },
          { name: "Pricing", href: "#pricing" },
          { name: "Contact", href: "#contact" }
        ]}
        {...headerProps}
      />
      
      <main className="flex-grow pt-16">
        <Hero
          title={companyName}
          subtitle={tagline}
          buttonText="Get Started"
          buttonLink="#features"
          variant="default"
          {...heroProps}
        />
        
        <div id="features">
          <Features
            title="Our Services"
            subtitle="What we offer to our clients"
            features={[
              {
                title: "Web Development",
                description: "Custom websites that look great on any device.",
                icon: "💻"
              },
              {
                title: "Digital Marketing",
                description: "Strategies to increase your online presence.",
                icon: "📈"
              },
              {
                title: "Brand Identity",
                description: "Unique and memorable brand identities.",
                icon: "🎨"
              }
            ]}
            variant="card"
            {...featuresProps}
          />
        </div>
        
        <div id="testimonials">
          <Testimonials
            title="What Our Clients Say"
            variant="default"
            {...testimonialsProps}
          />
        </div>
        
        <div id="pricing">
          <Pricing
            title="Simple, Transparent Pricing"
            subtitle="No hidden fees or long-term contracts"
            variant="card"
            {...pricingProps}
          />
        </div>
        
        <div id="contact">
          <ContactForm
            title="Get In Touch"
            subtitle="Have questions? We're here to help!"
            variant="default"
            {...contactFormProps}
          />
        </div>
      </main>
      
      <Footer
        companyName={companyName}
        {...footerProps}
      />
    </div>
  );
}
