import Header from '../core/Header';
import Footer from '../core/Footer';
import Hero from '../core/Hero';
import Gallery from '../core/Gallery';
import Testimonials from '../core/Testimonials';
import ContactForm from '../core/ContactForm';

export default function PortfolioLayout({
  name = "John Doe",
  profession = "Web Developer & Designer",
  bio = "I create beautiful websites and digital experiences.",
  heroImage = "/placeholder/1600/900",
  galleryImages = [
    { url: "/placeholder/600/400", alt: "Project 1", caption: "Project 1" },
    { url: "/placeholder/600/400", alt: "Project 2", caption: "Project 2" },
    { url: "/placeholder/600/400", alt: "Project 3", caption: "Project 3" },
    { url: "/placeholder/600/400", alt: "Project 4", caption: "Project 4" },
    { url: "/placeholder/600/400", alt: "Project 5", caption: "Project 5" },
    { url: "/placeholder/600/400", alt: "Project 6", caption: "Project 6" }
],
testimonials = [
  {
    quote: "Working with John was an absolute pleasure. His attention to detail is remarkable.",
    author: "Jane Smith",
    position: "CEO, Design Agency",
    avatar: "/placeholder/60/60"
  },
  {
    quote: "John delivered beyond our expectations. I would highly recommend his services.",
    author: "Mike Johnson",
    position: "Marketing Director",
    avatar: "/placeholder/60/60"
  }
],
contactFormProps = {},
headerProps = {},
footerProps = {}
}) {
return (
  <div className="flex flex-col min-h-screen">
    <Header 
      title={name}
      navItems={[
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" }
      ]}
      variant="transparent"
      {...headerProps}
    />
    
    <main className="flex-grow">
      <Hero
        title={name}
        subtitle={profession}
        buttonText="View My Work"
        buttonLink="#portfolio"
        backgroundImage={heroImage}
        variant="image"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-xl text-gray-600">{bio}</p>
          </div>
        </div>
      </section>
      
      <div id="portfolio">
        <Gallery
          title="My Portfolio"
          images={galleryImages}
          variant="grid"
        />
      </div>
      
      <div id="testimonials">
        <Testimonials
          title="Client Testimonials"
          testimonials={testimonials}
          variant="card"
        />
      </div>
      
      <div id="contact">
        <ContactForm
          title="Get In Touch"
          subtitle="Have a project in mind? Let's talk!"
          variant="default"
          {...contactFormProps}
        />
      </div>
    </main>
    
    <Footer 
      companyName={name}
      links={[
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" }
      ]}
      variant="minimal"
      {...footerProps}
    />
  </div>
);
}