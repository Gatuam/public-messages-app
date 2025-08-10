"use client";
import { features, testimonials } from "@/lib/constant";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Star,
} from "lucide-react";
import React, { useState, useEffect } from "react";

export default function PublicMessageLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto ">
        <section className="relative pt-20 pb-32 px-6">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.4) 1px, transparent 0)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-600/20 backdrop-blur-sm rounded-full border border-green-500/30 mb-12">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">
                Now Live - Special Launch Offer
              </span>
              <ArrowRight className="w-4 h-4 ml-2 text-green-300" />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="text-green-400">Public Messaging</span>
              <span className="text-white"> and</span>
              <br />
              <span className="text-white">Community Building,</span>
              <br />
              <span className="text-gray-400">without</span>
              <br />
              <span className="text-white">Breaking the Bank</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed">
              Connect with communities worldwide through secure messaging,
              real-time conversations, and powerful collaboration tools - all at
              a fraction of the cost of alternatives
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
              <button className="group px-8 py-4 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold text-lg transition-all duration-300 flex items-center shadow-lg shadow-green-600/25 hover:shadow-green-500/40">
                Start for Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <p className="text-gray-500 text-sm">No credit card required</p>
            </div>

            {/* Stats Dashboard */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Active Users */}
                <div className="text-left">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-gray-400 text-sm font-medium">
                      Currently Active for
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    2M+ Users
                  </div>
                  <div className="text-gray-500 text-sm">
                    Connected worldwide
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-gray-400 text-sm font-medium">
                      Last Updated
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    50K+ Channels
                  </div>
                  <div className="text-gray-500 text-sm">
                    Real-time communities
                  </div>
                </div>

                <div className="text-left">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-gray-400 text-sm font-medium">
                      Reliability
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    99.9% Uptime
                  </div>
                  <div className="text-gray-500 text-sm">Always available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-6 bg-gray-900/30">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need for seamless communication and community
              building in one comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-green-500/30 transition-all duration-500 hover:bg-gray-800/80 h-full">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600/30 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="py-24 px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Loved by Communities
            </h2>
            <p className="text-xl text-gray-400">
              Real feedback from our growing user base
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden">
              <div className="p-12 md:p-16 text-center">
                <div className="flex justify-center mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current mx-1"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-2xl md:text-3xl text-white mb-10 italic font-light leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="mb-8">
                  <div className="font-bold text-green-400 text-xl mb-1">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400 text-lg">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border-t border-gray-700/50 p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevTestimonial}
                    className="flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300 text-gray-300 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "bg-green-400"
                            : "bg-gray-600"
                        }`}
                        onClick={() => setCurrentTestimonial(index)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300 text-gray-300 hover:text-white"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Ready to Connect?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Join millions of users building communities and connecting through
              secure, powerful messaging
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <button className="group px-10 py-5 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold text-xl transition-all duration-300 flex items-center shadow-lg shadow-green-600/25 hover:shadow-green-500/40">
                Get Started Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <div className="flex items-center text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Free to start, upgrade anytime
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-gray-800/50 bg-gray-900/30">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PublicMsg</span>
            </div>
            <p className="text-gray-500">
              © 2025 PublicMsg. Connecting communities worldwide.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
