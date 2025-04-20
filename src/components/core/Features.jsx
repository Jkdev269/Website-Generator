export default function Features({
    title = "Our Features",
    subtitle = "What makes us different",
    features = [
      {
        title: "Feature 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "💡"
      },
      {
        title: "Feature 2",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: "⚡"
      },
      {
        title: "Feature 3",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        icon: "🚀"
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
            {features.map((feature, index) => (
              <div key={index} className={`
                ${variant === 'card' ? 'bg-white p-6 rounded-lg shadow-md' : ''}
                ${variant === 'minimal' ? 'border-t pt-6' : ''}
              `}>
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }