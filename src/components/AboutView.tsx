import React from 'react';
import { motion } from 'motion/react';
import { Shield, BookOpen, Heart, Award, Calendar, GraduationCap } from 'lucide-react';
import { BIOGRAPHY } from '../data';

interface AboutViewProps {
  onNavigate: (route: 'home' | 'about' | 'discography' | 'contact' | 'privacy') => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const timeline = [
    {
      period: '2004 – 2016',
      title: 'The Foundation: Childhood',
      subTitle: 'Jacksonville, Florida',
      icon: <GraduationCap size={16} className="text-[#00F0FF]" />,
      color: 'border-[#00F0FF]/30 hover:border-[#00F0FF]',
      bullets: [
        { label: 'Origin', text: `Born in Jacksonville, Florida, on April 6, 2004.` },
        { label: 'Education', text: `Attended Martin Luther King Jr. Elementary School from 2009 to 2016.` },
        { label: 'Family Sanctuary', text: `Adopted and raised under the loving guidance of maternal great-aunt, Susie Annette Hartman.` },
        { label: 'The Catalyst', text: `The historical transition of October 9, 2014, leading to the passing of adoptive father Nick Fairbanks Hartman on October 10, 2014. This tragic loss became the core frequency of the "No Stories Left Behind" philosophy.` }
      ]
    },
    {
      period: '2016 – 2022',
      title: 'The Formative Years: Teenage Era',
      subTitle: 'Hopkinsville, Kentucky',
      icon: <BookOpen size={16} className="text-[#FF5F00]" />,
      color: 'border-[#FF5F00]/30 hover:border-[#FF5F00]',
      bullets: [
        { label: 'Relocation', text: `Moved to Kentucky, attending Hopkinsville Middle School (2016–2018) and Hopkinsville High School (2018–2022).` },
        { label: 'Acoustic Mastery', text: `Spent 6th through 12th grade inside school bands. Mastering acoustic instrumentation and learning how collective brass and percussion serve as a singular conduit of human emotion.` },
        { label: 'Sanctuary of Sound', text: `The band room became a refuge to articulate internal grief, providing the architectural foundation for music as a vehicle for emotional survival.` }
      ]
    },
    {
      period: '2022 – Present',
      title: 'The Evolution: Adulthood',
      subTitle: 'US Army & Oklahoma City',
      icon: <Shield size={16} className="text-[#00F0FF]" />,
      color: 'border-[#00F0FF]/30 hover:border-[#00F0FF]',
      bullets: [
        { label: 'Service & Order', text: `Enlisted in the United States Army. The rigorous structure, discipline, and operational command direct his meticulous approach to sonic engineering and songwriting.` },
        { label: 'Matrimony', text: `Married to Katelynn Kay Hartman on March 2, 2026, establishing a resilient partnership in life and art.` },
        { label: 'DoubleU Identity', text: `Currently based in Oklahoma City (405 area). Launching DoubleU, a pain-music and soul-trap vehicle using fluorescent orange and cyan neon grids. Solidifying memory through releases like Faded 405 (Feb 2026), Dear Author (Apr 2026), and Nights On The Fault (Jun 2026).` }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Editorial Header */}
      <header className="border-b border-slate-900 pb-8 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full font-mono text-[10px] tracking-widest text-[#00F0FF] uppercase">
          <Award size={10} className="text-[#FF5F00]" />
          <span>Biographical Chronicle Node</span>
        </div>
        <h1 className="heading-font text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          THE STORY <span className="text-[#FF5F00]">BEHIND THE SOUND</span>
        </h1>
        <p className="text-xs font-mono text-slate-500 uppercase">
          Chronology of William Kirby Hartman (p/k/a DoubleU)
        </p>
      </header>

      {/* Main Narrative Introduction */}
      <section className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed text-sm md:text-base space-y-6">
        <p>
          "DoubleU is not just a stage name; it is a structural document of transition." 
          This sonic project is built upon the foundational reality that every story deserves to be heard, 
          especially those marked by historical ruptures and displacement. Every track published is a concrete 
          marker of survival, discipline, and acoustic memory.
        </p>
      </section>

      {/* Structured Chronology Timeline */}
      <section className="space-y-12">
        <h2 className="heading-font text-lg font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3 flex items-center space-x-2">
          <Calendar size={16} className="text-[#00F0FF]" />
          <span>Historical Timeline Logs</span>
        </h2>

        <div className="relative border-l border-slate-900 pl-6 md:pl-8 space-y-12 ml-4">
          {timeline.map((node, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-slate-950/40 border rounded-2xl p-6 md:p-8 backdrop-blur transition-all duration-300 ${node.color}`}
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[43px] md:-left-[51px] top-8 h-8 w-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                {node.icon}
              </div>

              <span className="font-mono text-xs text-[#FF5F00] font-bold tracking-widest block mb-1">
                {node.period}
              </span>

              <h3 className="heading-font text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-0.5">
                {node.title}
              </h3>
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-6">
                {node.subTitle}
              </p>

              <ul className="space-y-4 text-xs md:text-sm text-slate-400 font-light">
                {node.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="relative pl-4 border-l border-slate-900 hover:border-[#00F0FF] transition-colors duration-200 py-1">
                    <strong className="text-slate-300 font-medium font-mono uppercase text-[10px] tracking-wider block mb-0.5">
                      {bullet.label}
                    </strong>
                    {bullet.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Legacy block */}
      <section className="bg-slate-950/60 border border-slate-900 p-8 rounded-2xl space-y-4">
        <h3 className="heading-font text-white font-bold uppercase tracking-wider text-sm text-[#00F0FF]">
          No Stories Left Behind Integration
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          The passing of Nick Fairbanks Hartman in 2014 remains the anchoring pivot of William's artistic mandate. 
          To ensure that "No Stories are Left Behind," his musical catalogs are compiled as secure digital vaults, 
          fully indexed with schema references so that their structural history is preserved forever in global knowledge databases.
        </p>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-mono text-[#FF5F00] hover:text-[#00F0FF] uppercase font-bold tracking-widest transition"
          >
            Connect with the Artist &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
