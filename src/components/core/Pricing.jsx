export default function Pricing({
    title = "Our Pricing Plans",
    subtitle = "Choose the right plan for your needs",
    plans = [
      {
        name: "Basic",
        price: "$9",
        period: "monthly",
        description: "Perfect for small projects",
        features: [
          "1 User",
          "5 Projects",
          "5GB Storage",
          "Basic Support"
        ],
        buttonText: "Get Started",
        buttonLink: "#",
        highlighted: false
      },
      {
        name: "Pro",
        price: "$29",
        period: "monthly",
        description: "Great for growing businesses",
        features: [
          "5 Users",
          "20 Projects",
          "20GB Storage",
          "Priority Support",
          "Advanced Features"
        ],
        buttonText: "Get Started",
        buttonLink: "#",
        highlighted: true
      },
      {
        name: "Enterprise",
        price: "$99",
        period: "monthly",
        description: "For large organizations",
        features: [
          "Unlimited Users",
          "Unlimited Projects",
          "100GB Storage",
          "24/7 Support",
          "Advanced Features",
          "Custom Integrations"
        ],
        buttonText: "Contact Us",
        buttonLink: "#",
        highlighted: false
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`
                  ${variant === 'card' || variant === 'default' ? 'border rounded-lg p-6' : 'p-4'} 
                  ${plan.highlighted ? 'border-indigo-600 shadow-md' : 'border-gray-200'}
                  ${variant === 'minimal' ? 'border-t' : ''}
                `}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold">{plan.price}
                    <span className="text-base font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a
                  href={plan.buttonLink}
                  className={`
                    block w-full py-2 px-4 text-center rounded-md font-medium 
                    ${plan.highlighted ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} 
                    transition-colors
                  `}
                >
                  {plan.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  