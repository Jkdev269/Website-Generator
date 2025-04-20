export default function BlogSection({
    title = "Latest Articles",
    subtitle = "Read our latest news and insights",
    posts = [
      {
        title: "Getting Started with Web Development",
        excerpt: "Learn the basics of web development and how to build your first website.",
        date: "April 15, 2025",
        author: "John Doe",
        image: "/placeholder/400/250",
        link: "/blog/getting-started"
      },
      {
        title: "10 Tips for Better SEO",
        excerpt: "Improve your website's search engine rankings with these proven tips.",
        date: "April 10, 2025",
        author: "Jane Smith",
        image: "/placeholder/400/250",
        link: "/blog/seo-tips"
      },
      {
        title: "The Future of Web Design",
        excerpt: "Explore the upcoming trends that will shape the future of web design.",
        date: "April 5, 2025",
        author: "Mike Johnson",
        image: "/placeholder/400/250",
        link: "/blog/future-web-design"
      }
    ],
    variant = "default" // default, card, minimal
  }) {
    const variants = {
      default: "py-16 bg-white",
      card: "py-16 bg-gray-50",
      minimal: "py-16 bg-white"
    };
    
    return (
      <section className={variants[variant]}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article 
                key={index} 
                className={`
                  ${variant === 'card' ? 'bg-white rounded-lg shadow-md overflow-hidden' : ''}
                  ${variant === 'minimal' ? 'border-t pt-6' : ''}
                `}
              >
                {post.image && variant !== 'minimal' && (
                  <a href={post.link}>
                    <img 
                      src={`/api${post.image}`} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  </a>
                )}
                
                <div className={variant === 'card' ? 'p-6' : 'pt-4'}>
                  <h3 className="text-xl font-bold mb-2">
                    <a href={post.link} className="hover:text-indigo-600">{post.title}</a>
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    {post.date && <span className="mr-4">{post.date}</span>}
                    {post.author && <span>By {post.author}</span>}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <a href={post.link} className="text-indigo-600 font-medium hover:underline">
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }