'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, MessageCircle, Heart,
  Globe, Smartphone, Shield, Zap, Sparkles
} from 'lucide-react';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: Users, title: "Connect Instantly", desc: "Meet like-minded people nearby in seconds." },
    { icon: MessageCircle, title: "Rich Conversations", desc: "Share stories, photos, and create memories." },
    { icon: Heart, title: "Meaningful Bonds", desc: "Form lasting relationships that matter." }
  ];

  const stats = [
    { number: "2.5M+", label: "Active Users" },
    { number: "50M+", label: "Connections Made" },
    { number: "150+", label: "Countries" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Animations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="px-6 py-8 relative z-20">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              SocialSphere
            </span>
          </motion.div>
          <div className="flex items-center space-x-6">
            {["About", "Features", "Community"].map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1, color: "#fff" }}
                className="text-white/70 hover:text-white transition-colors"
              >
                {item}
              </motion.button>
            ))}
            <Link href="/sign-in">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Connect.<br /> Share.<br /> Thrive.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
        >
          Join millions of people creating meaningful connections in the most beautiful social space.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/sign-up">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-2xl flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border-2 border-white/20 px-8 py-4 rounded-full text-lg font-semibold hover:border-white/40 hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            Watch Demo
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-white/60 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Why Choose SocialSphere?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setActiveFeature(i)}
              animate={{ scale: activeFeature === i ? 1.05 : 1 }}
              className={`relative p-8 rounded-2xl backdrop-blur-md border border-white/10 transition-all duration-500 cursor-pointer 
                ${activeFeature === i ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-pink-400/50 shadow-lg' : 'bg-white/5 hover:bg-white/10'}
              `}
            >
              <f.icon className={`w-12 h-12 mb-6 ${activeFeature === i ? 'text-pink-400' : 'text-white/70'}`} />
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/70 text-lg">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-pink-400/30"
        >
          <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Connect?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join our growing community and start building meaningful relationships today.
          </p>
          <Link href="/sign-up">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-2xl"
            >
              Get Started Now
            </motion.button>
          </Link>
          <div className="mt-6 text-white/60">
            Free to join • No credit card required • Join in 30 seconds
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              SocialSphere
            </span>
          </div>
          <div className="text-white/60">
            © 2025 SocialSphere. Connecting hearts and minds across the globe.
          </div>
        </div>
      </footer>
    </div>
  );
}
