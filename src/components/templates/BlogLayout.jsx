import Header from '../core/Header';
import Footer from '../core/Footer';
import Hero from '../core/Hero';
import BlogSection from '../core/BlogSection';
import Features from '../core/Features';
import ContactForm from '../core/ContactForm';
import { useTheme } from '../../lib/context/ThemeContext';

export default function BlogLayout({
  blogName = "The Blog",
  tagline = "News, Tips, and Insights",
  latestPosts = [],
  categories = [
    { name: "Technology", count: 12 },
    { name: "Design", count: 8 },
    { name: "Business", count: 10 },
    { name: "Marketing", count: 6 }
  ],
  headerProps = {},
  heroProps = {},
  blogSectionProps = {},
  featuredPostsProps = {},
  contactFormProps = {},
  footerProps = {}
})
 {
  const { palette } = useTheme();
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title={blogName}
        navItems={[
          { name: "Home", href: "#" },
          { name: "Articles", href: "#articles" },
          { name: "Categories", href: "#categories" },
          { name: "Contact", href: "#contact" }
        ]}
        {...headerProps}
      />
      
      <main className="flex-grow">
        <Hero
          title={blogName}
          subtitle={tagline}
          buttonText="Read Latest"
          buttonLink="#articles"
          variant="default"
          {...heroProps}
        />
        
        <div id="articles">
          <BlogSection
            title="Latest Articles"
            subtitle="Stay updated with our newest content"
            posts={latestPosts.length > 0 ? latestPosts : [
              {
                title: "Getting Started with Web Development",
                excerpt: "Learn the basics of web development and how to build your first website.",
                date: "April 15, 2025",
                author: "John Doe",
                image: "https://cdn.dribbble.com/userupload/33363636/file/original-cfeec33e6ca179655047ca7cc4bffe3f.png?resize=752x&vertical=center",
                link: "#"
              },
              {
                title: "10 Tips for Better SEO",
                excerpt: "Improve your website's search engine rankings with these proven tips.",
                date: "April 10, 2025",
                author: "Jane Smith",
                image: "https://cdn.dribbble.com/userupload/17465009/file/original-edf1a277c89ba2580056d84c7e945aa4.png?resize=752x&vertical=center",
                link: "#"
              },
              {
                title: "The Future of Web Design",
                excerpt: "Explore the upcoming trends that will shape the future of web design.",
                date: "April 5, 2025",
                author: "Mike Johnson",
                image: "https://cdn.dribbble.com/userupload/24005356/file/original-321f3bf5e872ca21ed7596d4e45f7f2e.png?resize=752x&vertical=center",
                link: "#"
              }
            ]}
            variant="card"
            {...blogSectionProps}
          />
        </div>
        
        <div id="categories" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {categories.map((category, index) => (
                <a 
                  key={index} 
                  // href={`/category/${category.name.toLowerCase()}`}
                  className="block p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold mb-1">{category.name}</h3>
                  <span className="text-gray-600">{category.count} articles</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div id="featured-posts">
          <Features
            title="Featured Content"
            subtitle="Our most popular articles and guides"
            features={[
              {
                title: "Complete SEO Guide",
                description: "Everything you need to know about search engine optimization.",
                icon: "📊"
              },
              {
                title: "Web Design Trends",
                description: "Stay updated with the latest trends in web design.",
                icon: "🎨"
              },
              {
                title: "Marketing Strategy",
                description: "Learn how to create an effective marketing strategy.",
                icon: "📈"
              }
            ]}
            variant="minimal"
            {...featuredPostsProps}
          />
        </div>
        
        <div id="contact">
          <ContactForm
            title="Get In Touch"
            subtitle="Have questions or suggestions? Let us know!"
            variant="card"
            {...contactFormProps}
          />
        </div>
      </main>
      
      <Footer
        companyName={blogName}
        {...footerProps}
      />
    </div>
  );
}