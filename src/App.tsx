/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView 
} from 'motion/react';
import { 
  ArrowRight, 
  Monitor, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  MapPin, 
  Navigation,
  Globe,
  Menu,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const GeometricLine = ({ className = "", direction = "h" }: { className?: string, direction?: "h" | "v" }) => {
  return (
    <motion.div 
      initial={{ scaleX: 0, scaleY: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-brand-orange/30 ${direction === 'h' ? 'h-[1px] w-full origin-left' : 'w-[1px] h-full origin-top'} ${className}`}
    />
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => {
  return (
    <div className="mb-20 md:mb-32">
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-brand-orange text-sm font-bold tracking-[0.3em] uppercase mb-6"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[12vw] sm:text-6xl md:text-8xl lg:text-[10vw] leading-[0.85] text-white"
      >
        {children}
      </motion.h2>
    </div>
  );
};

const GlitchTagline = () => {
  const tagline = "YOUR COMPETITION IS GLOBAL";
  
  return (
    <section className="py-32 md:py-48 bg-black overflow-hidden border-y border-zinc-900 relative">
      <div className="container mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ 
             opacity: 1,
             transition: { duration: 0.1 }
           }}
           viewport={{ once: false, amount: 0.5 }}
           className="relative inline-block"
        >
          <motion.h3 
            className="text-[8vw] md:text-7xl lg:text-[10vw] font-black tracking-tighter text-white"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.2,
              repeatType: "mirror",
              ease: "linear"
            }}
          >
            {tagline}
          </motion.h3>
          
          {/* Glitch overlays */}
          <motion.h3 
            className="absolute top-0 left-0 text-[8vw] md:text-7xl lg:text-[10vw] font-black tracking-tighter text-brand-orange opacity-50 mix-blend-screen"
            animate={{
              x: [-4, 4, -2, 2, 0],
              opacity: [0, 0.5, 0.2, 0.7, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.15,
              ease: "linear"
            }}
          >
            {tagline}
          </motion.h3>
          <motion.h3 
            className="absolute top-0 left-0 text-[8vw] md:text-7xl lg:text-[10vw] font-black tracking-tighter text-cyan-400 opacity-50 mix-blend-screen"
            animate={{
              x: [4, -4, 2, -2, 0],
              opacity: [0, 0.7, 0.1, 0.5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.17,
              ease: "linear"
            }}
          >
            {tagline}
          </motion.h3>
        </motion.div>
      </div>
    </section>
  );
};

// --- Sections ---

const QuadHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Center Logo */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-50 py-4 px-10 bg-black border-x border-b border-zinc-800"
      >
        <div className="flex items-center gap-4">
          <img 
            src="https://res.cloudinary.com/dtkluxukm/image/upload/q_auto/f_auto/v1776641232/BD_BD_tlbjmi.png" 
            alt="BroadBrand Logo" 
            className="w-10 h-10 object-cover border border-brand-orange transition-all duration-500 cursor-pointer"
            referrerPolicy="no-referrer"
          />
          <span className="text-2xl font-black tracking-tighter hidden md:block">BROADBRAND</span>
        </div>
      </motion.div>

      {/* Bottom Tagline */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 py-2 px-6 bg-black border-x border-t border-zinc-800 hidden md:block"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 whitespace-nowrap">
          The Outdoor Authority
        </span>
      </motion.div>

      {/* Left Center Rail */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 py-4 px-1 h-32 flex items-center justify-center bg-black border-y border-r border-zinc-800 hidden lg:flex">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400 rotate-180 [writing-mode:vertical-rl]">
          BROADBRAND
        </span>
      </div>

      {/* Right Center Rail */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 py-4 px-1 h-32 flex items-center justify-center bg-black border-y border-l border-zinc-800 hidden lg:flex">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-orange [writing-mode:vertical-rl]">
          OWERRI • NIGERIA
        </span>
      </div>

      {/* Corners */}
      <div className="fixed top-0 left-0 z-50 p-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:border-brand-orange group transition-colors bg-black"
        >
          {isOpen ? <X className="text-brand-orange" /> : <Menu className="group-hover:text-brand-orange transition-colors" />}
        </button>
      </div>

      <div className="fixed top-0 right-0 z-50 p-6 hidden md:block">
        <a href="#campaign" className="text-[10px] font-bold tracking-widest hover:text-brand-orange transition-colors uppercase border border-zinc-800 px-4 py-3 bg-black">
          Start Campaign
        </a>
      </div>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed inset-0 z-40 bg-black flex items-center p-12 md:p-24"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ff751f15_0%,transparent_50%)]" />
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto gap-24 relative z-10">
              <nav className="flex flex-col gap-8">
                {['Home', 'About', 'Why Outdoor', 'Locations', 'Process', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-8xl font-black tracking-tighter hover:text-brand-orange transition-colors group flex items-center gap-4"
                  >
                    <span className="text-xl md:text-2xl text-zinc-700 font-mono group-hover:text-brand-orange/50 transition-colors">
                      0{i + 1}
                    </span>
                    {item}
                  </motion.a>
                ))}
              </nav>
              <div className="hidden md:flex flex-col justify-end gap-12 border-l border-zinc-800 pl-12">
                <div>
                  <h4 className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-4">Location</h4>
                  <p className="text-zinc-400 text-2xl font-medium leading-relaxed">
                    12 Owerri-Port Harcourt Expressway,<br />
                    Owerri, Imo State,<br />
                    Nigeria
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-24 flex flex-col relative overflow-hidden border-b border-zinc-900">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/advertising/1920/1080?blur=10')] opacity-5 grayscale" />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 border-t border-zinc-800">
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[14vw] sm:text-7xl md:text-9xl xl:text-[11vw] leading-[0.82] mb-16 font-black tracking-tighter">
              YOUR BRAND. <br />
              <span className="text-brand-orange underline decoration-[6px] underline-offset-[16px]">THEIR EYES.</span> <br />
              EVERYWHERE.
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
              Premium outdoor advertising strategies that dominate the Owerri landscape. 
              We don't just rent billboards; we build landmarks.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-brand-orange text-black px-10 py-6 font-black text-xs tracking-widest uppercase flex items-center gap-3 hover:translate-x-2 transition-transform duration-500">
                Start Your Campaign <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-zinc-800 text-white px-10 py-6 font-black text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-zinc-900 transition-colors">
                View Locations
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative overflow-hidden min-h-[400px] lg:min-h-auto flex items-center justify-center p-12 lg:p-24">
          <div className="absolute inset-x-0 h-[1px] bg-zinc-800 top-1/4" />
          <div className="absolute inset-x-0 h-[1px] bg-zinc-800 top-2/4" />
          <div className="absolute inset-x-0 h-[1px] bg-zinc-800 top-3/4" />
          <div className="absolute inset-y-0 w-[1px] bg-zinc-800 left-1/4" />
          <div className="absolute inset-y-0 w-[1px] bg-zinc-800 left-2/4" />
          <div className="absolute inset-y-0 w-[1px] bg-zinc-800 left-3/4" />

          {/* Abstract Billboard Wireframe */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-md aspect-[16/9] border-2 border-brand-orange relative z-10 bg-black/40 backdrop-blur-sm group hover:border-white transition-colors duration-500"
          >
            <div className="absolute -inset-4 border border-zinc-800 -z-10 group-hover:border-brand-orange/40 transition-colors" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-white opacity-20" />
            
            {/* Animated SVG line */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none">
              <motion.path 
                d="M 10 10 L 90 90 L 170 10" 
                fill="none" 
                stroke="#ff751f" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.path 
                d="M 10 150 Q 80 80 150 150" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              />
            </svg>

            <div className="absolute bottom-4 left-4 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-brand-orange">LOC_OWERRI_HQ</span>
              <span className="text-[8px] font-mono text-zinc-500 uppercase">5.4891° N, 7.0176° E</span>
            </div>
            <div className="absolute top-4 right-4 group-hover:rotate-45 transition-transform duration-700">
               <Navigation className="w-4 h-4 text-brand-orange" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 border-b border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <div className="h-[1px] w-16 bg-brand-orange" />
            <span className="text-zinc-500 font-bold tracking-[0.4em] uppercase text-sm">Who We Are</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12vw] sm:text-6xl md:text-9xl leading-[0.8] mb-16"
          >
            WE PUT <span className="text-zinc-800">BRANDS</span> ON <br />
            <span className="italic text-brand-orange tracking-tighter">BIG SCREENS.</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 grid-auto-rows bg-zinc-900 border border-zinc-900 relative">
            {/* Background Curve */}
            <svg className="absolute -top-12 -right-12 w-64 h-64 opacity-10 pointer-events-none hidden lg:block">
              <motion.path 
                d="M 0 64 Q 128 0 256 64" 
                fill="none" stroke="#ff751f" strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </svg>
            
            <div className="bg-black p-16 lg:col-span-2 border-b lg:border-b-0 border-zinc-900 flex flex-col justify-between group">
              <div>
                <Layers className="w-12 h-12 text-brand-orange mb-10 group-hover:scale-110 transition-transform" />
                <h3 className="text-4xl mb-8">Billboard Domination</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xl text-xl mb-10">
                  Static Portraits, Static 360, Mesh, and Large Format. We deploy across the most strategic corridors in Nigeria.
                </p>
              </div>
              <div className="flex items-center gap-4 border border-brand-orange/30 self-start px-8 py-4">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span className="text-sm font-bold tracking-widest text-brand-orange uppercase">Owerri • Imo State • Nigeria</span>
              </div>
            </div>
            <div className="bg-black p-16 flex flex-col justify-between group hover:bg-zinc-950 transition-colors">
              <div>
                <Monitor className="w-12 h-12 text-zinc-600 mb-10 group-hover:text-brand-orange transition-colors" />
                <h3 className="text-4xl mb-8">Strategic Impact</h3>
                <p className="text-zinc-400 leading-relaxed text-xl">
                  Mesh wraps for urban landmarks and High-Impact Large Format for inter-state highway supremacy.
                </p>
              </div>
              <ChevronRight className="w-10 h-10 text-zinc-800 group-hover:text-brand-orange group-hover:translate-x-2 transition-all mt-16" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyOutdoor = () => {
  const metrics = [
    { num: "01", label: "Daily Reach", val: "250K+", desc: "Individual impressions across prime Owerri corridors." },
    { num: "02", label: "Brand Recall", val: "84%", desc: "Of commuters recognize brands displayed on major billboards." },
    { num: "03", label: "Uptime", val: "100%", desc: "Guaranteed site maintenance and illumination for LED assets." }
  ];

  return (
    <section id="why-outdoor" className="bg-black py-24 relative border-b border-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(#ff751f08_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Why Outdoor?">
          ADVERTISING THAT CAN'T <br />
          BE <span className="text-brand-orange">SCROLLED PAST.</span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-800">
          {metrics.map((m, i) => (
            <motion.div 
              key={m.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-12 border-b md:border-b-0 md:border-r border-zinc-800 last:border-r-0 hover:bg-zinc-900/40 transition-colors group"
            >
              <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mb-8 text-brand-orange font-mono group-hover:border-brand-orange transition-colors">
                {m.num}
              </div>
              <h4 className="text-zinc-500 font-bold tracking-widest uppercase text-xs mb-4">{m.label}</h4>
              <div className="text-7xl font-black mb-6 text-white group-hover:text-brand-orange transition-colors tracking-tighter">
                {m.val}
              </div>
              <p className="text-zinc-500 leading-relaxed font-medium">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BillboardLocations = () => {
  const locations = [
    { id: "LOC-001", name: "Wetheral Road", type: "Static Portrait", status: "Occupied" },
    { id: "LOC-002", name: "Douglas Road", type: "Static Portrait", status: "Available" },
    { id: "LOC-003", name: "PH Expressway", type: "Large Format", status: "Occupied" },
    { id: "LOC-004", name: "Bank Road", type: "Mesh", status: "Available" },
    { id: "LOC-005", name: "World Bank", type: "Static 360", status: "Occupied" },
    { id: "LOC-006", name: "Ikenegbu", type: "Static Portrait", status: "Available" },
  ];

  return (
    <section id="locations" className="py-24 border-b border-zinc-900 group">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionTitle subtitle="Fleet Map">
            STRATEGIC <br />
            <span className="text-zinc-800 uppercase">Sites.</span>
          </SectionTitle>
          <a href="#" className="flex items-center gap-3 text-sm font-black tracking-widest uppercase pb-4 border-b border-zinc-800 hover:border-brand-orange transition-all duration-500 group-hover:text-brand-orange translate-y-[-24px]">
            View All Sites <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-zinc-900 border border-zinc-900 relative">
          {/* Decorative Curve Accent */}
          <svg className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 pointer-events-none hidden lg:block z-20">
            <motion.path 
              d="M 64 256 Q 0 128 64 0" 
              fill="none" stroke="#ff751f" strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>

          {locations.map((loc, i) => (
            <motion.div 
              key={loc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-8 group overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-brand-orange group-hover:h-full transition-all duration-500" />
              <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] font-mono text-zinc-600 group-hover:text-brand-orange transition-colors">
                  {loc.id}
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 border ${loc.status === 'Available' ? 'border-brand-orange text-brand-orange' : 'border-zinc-800 text-zinc-600'}`}>
                  {loc.status}
                </span>
              </div>
              <h5 className="text-3xl mb-2">{loc.name}</h5>
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                {loc.type}
              </p>
              
              <div className="mt-12 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                 <div className="flex gap-1">
                   <div className="w-1 h-1 bg-brand-orange" />
                   <div className="w-1 h-1 bg-brand-orange/50" />
                   <div className="w-1 h-1 bg-brand-orange/20" />
                 </div>
                 <button className="text-[10px] font-black uppercase text-brand-orange hover:underline underline-offset-4">
                   Enquire Now
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Book", desc: "Select your prime sites and campaign duration.", icon: <Calendar className="w-6 h-6" /> },
    { title: "Design", desc: "Our creative team optimizes your artwork for OOH.", icon: <Layers className="w-6 h-6" /> },
    { title: "Deploy", desc: "Your brand goes live across the city grid.", icon: <Globe className="w-6 h-6" /> },
    { title: "Measure", desc: "Receive site photos and traffic audit reports.", icon: <ExternalLink className="w-6 h-6" /> }
  ];

  return (
    <section id="process" className="py-24 bg-black overflow-hidden border-zinc-900 border-b">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="The Flow">
          FROM CONCEPT <br />
          TO <span className="text-brand-orange">CANVAS.</span>
        </SectionTitle>

        <div className="relative mt-24">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-900 hidden lg:block" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((s, i) => (
              <motion.div 
                key={s.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -top-12 left-0 text-7xl font-black text-zinc-900/50 group-hover:text-brand-orange/10 transition-colors pointer-events-none">
                  0{i + 1}
                </div>
                <div className="p-8 border border-zinc-800 bg-black group-hover:border-brand-orange transition-all duration-500">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center mb-12 group-hover:bg-brand-orange transition-colors">
                    {React.cloneElement(s.icon as React.ReactElement, { className: 'w-6 h-6 text-white group-hover:text-black transition-colors' })}
                  </div>
                  <h4 className="text-3xl mb-4 group-hover:text-brand-orange transition-colors">{s.title}</h4>
                  <p className="text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brand-orange rounded-full hidden lg:block border-[3px] border-black scale-0 group-hover:scale-100 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  const categories = [
    "Telecoms", "Fintech", "Retail", "Hospitality", "Real Estate", "Pharma"
  ];

  return (
    <section className="py-24 border-b border-zinc-900">
      <div className="container mx-auto px-6">
        <h4 className="text-zinc-600 text-xs font-bold tracking-[0.4em] uppercase mb-16 text-center">
          TRUSTED BY INDUSTRY LEADERS ACROSS THE SOUTH-EAST
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-zinc-900">
          {categories.map((cat) => (
            <div 
              key={cat}
              className="p-12 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-brand-orange transition-all duration-500 cursor-default group"
            >
              <span className="text-[10px] font-black tracking-widest uppercase text-center group-hover:scale-110 transition-transform">
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-black pt-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-[14vw] sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-12">
              LET'S <br />
              <span className="text-brand-orange italic">TALK.</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-sm mb-12 border-l border-zinc-800 pl-8">
              Dominating the landscape starts with a single conversation. Reach out today.
            </p>
            <div className="flex flex-col gap-6">
              <a href="mailto:hello@broadbrand.ng" className="text-2xl font-bold hover:text-brand-orange transition-colors">hello@broadbrand.com.ng</a>
              <a href="tel:+234800BROADBRAND" className="text-2xl font-bold hover:text-brand-orange transition-colors">+234 (0) 7060706416</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-zinc-900 border border-zinc-900 p-[1px]">
            <div className="bg-black p-12">
              <h5 className="text-brand-orange text-[10px] font-bold tracking-widest uppercase mb-6">Headquarters</h5>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Umuodu, Mbieri<br />
                Owerri, Imo State,<br />
                Nigeria 460221
              </p>
            </div>
            <div className="bg-black p-12">
              <h5 className="text-brand-orange text-[10px] font-bold tracking-widest uppercase mb-6">Inquiries</h5>
              <ul className="flex flex-col gap-4 text-zinc-500 font-medium">
                <li className="hover:text-white transition-colors cursor-pointer text-sm">Site Availability</li>
                <li className="hover:text-white transition-colors cursor-pointer text-sm">Partner Network</li>
                <li className="hover:text-white transition-colors cursor-pointer text-sm">Careers</li>
              </ul>
            </div>
            <div className="bg-brand-orange p-12 lg:col-span-2 group cursor-pointer hover:bg-white transition-colors duration-700">
               <div className="flex justify-between items-center text-black">
                 <span className="text-4xl font-black tracking-tighter">GET A QUOTE</span>
                 <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform duration-700" />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 py-16 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <img 
               src="https://res.cloudinary.com/dtkluxukm/image/upload/q_auto/f_auto/v1776641232/BD_BD_tlbjmi.png" 
               alt="BroadBrand Logo" 
               className="w-12 h-12 object-cover border border-brand-orange"
               referrerPolicy="no-referrer"
             />
             <span className="text-xl font-bold tracking-widest text-white">BROADBRAND</span>
          </div>
          
          <div className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-600 flex flex-wrap justify-center gap-12 md:gap-24">
            <span>OWERRI • NIGERIA</span>
            <span>DOMINATION IS DUTY</span>
            <span>© 2026 BROADBRAND LTD</span>
          </div>
        </div>
      </div>

      {/* Decorative Line drawing */}
      <svg className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <motion.circle 
          cx="300" cy="300" r="100" 
          fill="none" stroke="#ff751f" strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 4 }}
        />
      </svg>
    </footer>
  );
};

const MouseFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      animate={{ x: mousePos.x, y: mousePos.y }}
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-12 h-12 rounded-full border border-brand-orange -ml-6 -mt-6" />
      <div className="w-1 h-1 bg-brand-orange rounded-full absolute top-0 left-0 -ml-0.5 -mt-0.5" />
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative overflow-x-hidden bg-black selection:bg-brand-orange selection:text-black">
      <QuadHeader />
      
      <main className="relative z-10">
        {/* Background Grid Accent */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <Hero />
        <About />
        <GlitchTagline />
        <WhyOutdoor />
        <BillboardLocations />
        <Process />
        <Trust />
        <Footer />
      </main>

      <MouseFollower />
    </div>
  );
}
