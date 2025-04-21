import { useTheme } from "../../lib/context/ThemeContext";

export default function Features({
  title = "Our Features",
  subtitle = "What makes us different",
  features = [
    {
      title: "Feature 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "💡",
    },
    {
      title: "Feature 2",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "⚡",
    },
    {
      title: "Feature 3",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      icon: "🚀",
    },
  ],
}) {
  const { palette } = useTheme();

  return (
    <section className="py-16" style={{ backgroundColor: palette.background }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: palette.primary }}
          >
            {title}
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: palette.secondary }}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-md text-center transition-all"
              style={{
                backgroundColor: palette.light,
                color: palette.text,
              }}
            >
              <div
                className="mb-4 text-4xl"
                style={{ color: palette.accent }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: palette.primary }}
              >
                {feature.title}
              </h3>
              <p style={{ color: palette.text }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
