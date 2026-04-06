'use client';

import Image from 'next/image';
import { Sparkles, Rocket, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import SpotifyPlayer from '@/components/SpotifyPlayer';
import { heroContent } from '@/data/hero';

const Hero = () => {
  return (
    <header id="page-top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            className="mb-10 relative group"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [0, 1.1, 1] }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative p-1 bg-gradient-to-tr from-accent to-blue-600 rounded-full">
              <Image
                src={heroContent.profileImage}
                alt={heroContent.name}
                width={180}
                height={180}
                className="rounded-full border-4 border-background bg-background shadow-2xl relative z-10"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4 mb-8 pb-2 md:pb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-extrabold tracking-tighter leading-[1.15] title-banner-effect">
              {heroContent.name}
            </h1>
            <div className="flex items-center justify-center gap-3 text-muted-foreground font-montserrat font-semibold tracking-[0.2em] uppercase text-sm md:text-base pt-0.5">
              <motion.span
                className="h-px bg-border"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <span className="flex items-center gap-2">
                {heroContent.role} <Rocket className="w-4 h-4 text-accent" />
              </span>
              <motion.span
                className="h-px bg-border"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            Crafting <span className="text-foreground font-semibold">robust</span> and <span className="text-foreground font-semibold">accessible</span> digital experiences through code and design.
          </motion.p>

          <motion.div
            className="w-full max-w-md space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          >
            <SpotifyPlayer />

            <a
              href={heroContent.ctaHref}
              className="inline-flex items-center gap-2 text-sm font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group"
            >
              {heroContent.ctaLabel}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
