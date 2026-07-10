/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import QuoteCalculator from "./components/QuoteCalculator";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [preselectedCategory, setPreselectedCategory] = useState<string>("");

  const handleQuoteClick = () => {
    setPreselectedCategory("todos");
    const el = document.getElementById("cotizador");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceSelect = (categoryId: string) => {
    setPreselectedCategory(categoryId);
    const el = document.getElementById("cotizador");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans text-slate-300 selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden">
      {/* Premium Sticky Navigation */}
      <Header onQuoteClick={handleQuoteClick} />

      {/* Main Page Content */}
      <main>
        {/* Hero Slider Section */}
        <HeroSlider onQuoteClick={handleQuoteClick} />

        {/* Nosotros (Welcome message, Quiénes somos, Misión, Valores) */}
        <AboutSection />

        {/* Services Section */}
        <ServicesSection onServiceSelect={handleServiceSelect} />

        {/* Interactive Quote Calculator */}
        <QuoteCalculator preselectedCategory={preselectedCategory} />

        {/* Contact info & Branches Sede map locations */}
        <ContactSection />
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}

