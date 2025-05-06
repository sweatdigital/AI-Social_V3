import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FaVideo, FaRobot, FaEdit, FaShareAlt, FaChartLine, FaCalendarAlt } from "react-icons/fa";

export const meta: MetaFunction = () => {
  return [
    { title: "VideoAI - AI-Powered Social Media Video Editor" },
    { name: "description", content: "Create, edit, and publish videos to social media with AI assistance" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <FaVideo className="text-blue-500 text-3xl mr-2" />
          <h1 className="text-2xl font-bold">VideoAI</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#workflow" className="hover:text-blue-400 transition">How It Works</a>
          <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
        </nav>
        <div className="flex space-x-4">
          <Link to="/login" className="px-4 py-2 rounded border border-blue-500 hover:bg-blue-500 transition">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-5xl font-bold mb-6">Create Engaging Videos with AI</h2>
          <p className="text-xl text-gray-300 mb-8">
            Upload, edit, and publish short-form videos to multiple platforms with AI-powered enhancements.
            Save time and boost engagement with smart automation.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup" className="px-8 py-3 bg-blue-500 rounded-lg text-center hover:bg-blue-600 transition text-lg font-medium">
              Get Started
            </Link>
            <Link to="/demo" className="px-8 py-3 bg-gray-700 rounded-lg text-center hover:bg-gray-600 transition text-lg font-medium">
              Watch Demo
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="bg-blue-500/20 rounded-lg p-8 relative z-10">
              <img 
                src="/dashboard-preview.png" 
                alt="VideoAI Dashboard Preview" 
                className="rounded-lg shadow-2xl border border-gray-700"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-purple-500/10 rounded-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-blue-500/10 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful AI Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition">
                <div className="bg-blue-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-gray-900 rounded-xl p-8 border ${
                  plan.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-sm font-bold uppercase py-1 px-4 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/signup" 
                  className={`block text-center py-3 px-6 rounded-lg font-medium ${
                    plan.popular 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  } transition w-full`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Social Media Content?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of content creators who are saving time and increasing engagement with VideoAI.
          </p>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-blue-500 rounded-lg inline-block hover:bg-blue-600 transition text-lg font-medium"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <FaVideo className="text-blue-500 text-2xl mr-2" />
              <h2 className="text-xl font-bold">VideoAI</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Blog</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} VideoAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <FaRobot className="text-blue-500 text-2xl" />,
    title: "AI-Powered Editing",
    description: "Automatically trim videos, add subtitles, enhance faces, and detect scenes with advanced AI technology."
  },
  {
    icon: <FaEdit className="text-blue-500 text-2xl" />,
    title: "Smart Subtitles",
    description: "Generate accurate subtitles in multiple languages with perfect timing and customizable styles."
  },
  {
    icon: <FaShareAlt className="text-blue-500 text-2xl" />,
    title: "Multi-Platform Publishing",
    description: "Publish directly to TikTok, YouTube, Instagram, Facebook, and X with optimized formats for each platform."
  },
  {
    icon: <FaChartLine className="text-blue-500 text-2xl" />,
    title: "Performance Analytics",
    description: "Track engagement, views, and audience demographics across all platforms in one dashboard."
  },
  {
    icon: <FaCalendarAlt className="text-blue-500 text-2xl" />,
    title: "Content Scheduling",
    description: "Plan and schedule your content calendar for optimal posting times across all platforms."
  },
  {
    icon: <FaVideo className="text-blue-500 text-2xl" />,
    title: "Faceless AI Videos",
    description: "Create engaging faceless videos with AI-generated voiceovers and dynamic visuals."
  }
];

const workflow = [
  {
    title: "Upload or Create",
    description: "Upload existing videos or create new ones directly in the app with our built-in tools."
  },
  {
    title: "AI Enhancement",
    description: "Let our AI enhance your video with subtitles, face enhancement, scene detection, and more."
  },
  {
    title: "Customize & Edit",
    description: "Fine-tune the AI suggestions and add your personal touch to make the content perfect."
  },
  {
    title: "Publish & Analyze",
    description: "Schedule and publish to multiple platforms, then track performance from a single dashboard."
  }
];

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for beginners",
    price: 19,
    features: [
      "10 videos per month",
      "Basic AI editing tools",
      "Publish to 2 platforms",
      "Standard analytics",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Professional",
    description: "For serious content creators",
    price: 49,
    features: [
      "50 videos per month",
      "Advanced AI editing tools",
      "Publish to all platforms",
      "Detailed analytics",
      "Priority support",
      "Content scheduling"
    ],
    popular: true
  },
  {
    name: "Business",
    description: "For teams and agencies",
    price: 99,
    features: [
      "Unlimited videos",
      "All AI features",
      "Team collaboration",
      "Advanced analytics",
      "Dedicated support",
      "White-label options"
    ],
    popular: false
  }
];
