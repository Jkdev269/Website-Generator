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
 heroImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80", // developer desk
  galleryImages = [
    {
      url: "https://cdn.dribbble.com/userupload/42527471/file/original-8d2c5b7710a5d2951ad92d8516f33ab7.png?resize=752x&vertical=center",
      alt: "Project 1",
      caption: "Responsive Landing Page"
    },
    {
      url: "https://images.unsplash.com/photo-1642132652860-471b4228023e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Project 2",
      caption: "E-commerce Website Design"
    },
    {
      url: "https://cdn.dribbble.com/userupload/42653029/file/original-48c028a6109d888b4f08ea691a5a3d72.jpg?resize=752x&vertical=center",
      alt: "Project 3",
      caption: "Portfolio Website Concept"
    },
    {
      url: "https://cdn.dribbble.com/userupload/42549517/file/original-0ac92b771b8ded6724134a04f2e9a49d.png?resize=752x&vertical=center",
      alt: "Project 4",
      caption: "Web Dashboard UI"
    },
    {
      url: "https://cdn.dribbble.com/userupload/37453559/file/original-52c647736ecd74f8da51a96d0c9588e1.png?resize=752x&vertical=center",
      alt: "Project 5",
      caption: "Startup Website"
    },
    {
      url: "https://cdn.dribbble.com/userupload/5208176/file/original-8190f5d54c1a56894135d49be44e4fa4.jpg?resize=752x&vertical=center",
      alt: "Project 6",
      caption: "Minimal Blog Layout"
    }
],
testimonials = [
  {
    quote: "Working with John was an absolute pleasure. His attention to detail is remarkable.",
    author: "Jane Smith",
    position: "CEO, Design Agency",
    avatar: "https://i.pravatar.cc/60?img=1"
  },
  {
    quote: "John delivered beyond our expectations. I would highly recommend his services.",
    author: "Mike Johnson",
    position: "Marketing Director",
    avatar: "https://i.pravatar.cc/60?img=3"
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
        { name: "Home", href: "#" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" }
      ]}
      variant="default"
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