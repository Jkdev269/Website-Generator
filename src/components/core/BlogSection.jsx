import { useTheme } from '../../lib/context/ThemeContext';

export default function BlogSection({
  title = "Latest Articles",
  subtitle = "Read our latest news and insights",
  posts = [
    {
      title: "Getting Started with Web Development",
      excerpt: "Learn the basics of web development and how to build your first website.",
      date: "April 15, 2025",
      author: "John Doe",
      image: "https://images.unsplash.com/photo-1581276879432-15a9b4f2b6f6?auto=format&fit=crop&w=400&q=80", // laptop + coding
      link: "/blog/getting-started"
    },
    {
      title: "10 Tips for Better SEO",
      excerpt: "Improve your website's search engine rankings with these proven tips.",
      date: "April 10, 2025",
      author: "Jane Smith",
      image: "https://images.unsplash.com/photo-1581091012184-7c2b601a8824?auto=format&fit=crop&w=400&q=80", // SEO analysis screen
      link: "/blog/seo-tips"
    },
    {
      title: "The Future of Web Design",
      excerpt: "Explore the upcoming trends that will shape the future of web design.",
      date: "April 5, 2025",
      author: "Mike Johnson",
      image: "https://images.unsplash.com/photo-1614359676848-02f7da6cd09d?auto=format&fit=crop&w=400&q=80", // modern UI design on screen
      link: "/blog/future-web-design"
    }
  ]
}) {
  const { palette } = useTheme();

  return (
    <section className="py-16 bg-white" style={{ backgroundColor: palette.background }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: palette.primary }}>{title}</h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: palette.accent }}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              style={{ backgroundColor: palette.card, color: palette.text }}
            >
              {post.image && (
                <a href={post.link}>
                  <img
                    src={`${post.image}`}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </a>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <a href={post.link} className="hover:underline" style={{ color: palette.primary }}>
                    {post.title}
                  </a>
                </h3>

                <div className="flex items-center text-sm mb-3" style={{ color: palette.muted }}>
                  {post.date && <span className="mr-4">{post.date}</span>}
                  {post.author && <span>By {post.author}</span>}
                </div>

                <p className="mb-4" style={{ color: palette.text }}>{post.excerpt}</p>

                <a
                  href={post.link}
                  className="font-medium hover:underline"
                  style={{ color: palette.link }}
                >
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
