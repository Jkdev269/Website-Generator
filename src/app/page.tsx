import Layout from '../components/layout/Layout';
import Link from 'next/link';
import "./globals.css";

export default function Home() {
  return (
    <Layout>
      <section className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Generate Your Website in Minutes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe what you want, and our AI-powered tool will create a custom website for you.
            No coding required!
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link href="/generate">
            <button className="bg-black hover:bg-blue-300 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Get Started
            </button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Simple",
              description: "Just describe your website needs in plain English and we'll handle the rest"
            },
            {
              title: "Fast",
              description: "Get your custom website generated in seconds, ready to download and use"
            },
            {
              title: "Flexible",
              description: "Choose from various templates and customize colors, layouts, and content"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}