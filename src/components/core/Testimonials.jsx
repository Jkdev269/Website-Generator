export default function Testimonials({
    title = "What Our Clients Say",
    testimonials = [
      {
        quote: "This is an amazing product that has completely transformed how we work.",
        author: "Jane Smith",
        position: "CEO, Company Inc.",
        avatar: "/placeholder/60/60"
      },
      {
        quote: "I've been using this for months now and can't imagine going back.",
        author: "John Doe",
        position: "Marketing Director",
        avatar: "/placeholder/60/60"
      },
      {
        quote: "The customer service is top-notch and the product is even better.",
        author: "Sarah Johnson",
        position: "Freelancer",
        avatar: "/placeholder/60/60"
      }
    ],
    variant = "default" // default, card, minimal
  }) {
    const variants = {
      default: "py-16 bg-gray-50",
      card: "py-16 bg-white",
      minimal: "py-16 bg-white"
    };
    
    return (
      <section className={variants[variant]}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`
                  ${variant === 'card' ? 'bg-white shadow-md rounded-lg p-6' : ''}
                  ${variant === 'minimal' ? 'border-t pt-6' : ''}
                `}
              >
                <div className="flex items-center mb-4">
                  {testimonial.avatar && (
                    <div className="mr-4">
                      <img 
                        src={`/api${testimonial.avatar}`} 
                        alt={testimonial.author} 
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    {testimonial.position && (
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }