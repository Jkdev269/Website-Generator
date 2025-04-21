import { useTheme } from '../../lib/context/ThemeContext';

export default function Testimonials({
  title = "What Our Clients Say",
  testimonials = [
    {
      quote: "This is an amazing product that has completely transformed how we work.",
      author: "Jane Smith",
      position: "CEO, Company Inc.",
      avatar: "https://i.pravatar.cc/60?img=1" 
    },
    {
      quote: "I've been using this for months now and can't imagine going back.",
      author: "John Doe",
      position: "Marketing Director",
      avatar: "https://i.pravatar.cc/60?img=3"
    },
    {
      quote: "The customer service is top-notch and the product is even better.",
      author: "Sarah Johnson",
      position: "Freelancer",
      avatar: "https://i.pravatar.cc/60?img=12"
    }
  ]
}) {
  const { palette } = useTheme();

  return (
    <section className="py-16" style={{ backgroundColor: palette.background }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{ color: palette.primary }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6"
              style={{
                backgroundColor: palette.card,
                color: palette.text
              }}
            >
              <div className="flex items-center mb-4">
                {testimonial.avatar && (
                  <div className="mr-4">
                    <img
                      src={`${testimonial.avatar}`}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold" style={{ color: palette.primary }}>
                    {testimonial.author}
                  </h4>
                  {testimonial.position && (
                    <p className="text-sm" style={{ color: palette.muted }}>
                      {testimonial.position}
                    </p>
                  )}
                </div>
              </div>
              <p style={{ color: palette.text }}>"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
