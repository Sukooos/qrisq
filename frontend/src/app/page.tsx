'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { UseCases } from '@/components/landing/UseCases';
import RiskAnalysis from '@/components/features/RiskAnalysis';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-quantum-500/30">
      <Navbar />

      <Hero />

      <UseCases />

      <Features />

      {/* DEMO SECTION */}
      <section id="demo" className="py-24 bg-gray-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-quantum-400 font-mono text-sm tracking-wider uppercase">Live Interactive Demo</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Experience the Quantum Engine</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Test our risk analysis engine with your own business scenario. Real-time inference powered by Groq LLaMA-3 + Qiskit Aer.
            </p>
          </div>

          <RiskAnalysis />
        </div>
      </section>

      <Pricing />

      <Footer />
    </main>
  );
}
