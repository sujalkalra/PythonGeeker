"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Code2, Zap, Terminal, Github, Linkedin, Instagram } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl space-y-8"
      >
        <motion.div variants={item} className="space-y-4">
          <div className="inline-block rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm font-medium text-neon-blue backdrop-blur">
            🚀 The Future of Coding Education
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Learn Python in 2026 <br />
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              At the Speed of Light ⚡
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl">
            Beginner → Advanced. Hands-on learning with an interactive coding experience.
            Master Python with a professional, dark-themed developer environment.
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/modules">
            <Button variant="neon" size="lg" className="w-full sm:w-auto">
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/modules">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Modules
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-neon-blue" />}
            title="Instant Execution"
            description="Run your code instantly in our secure, sandboxed cloud environment."
          />
          <FeatureCard
            icon={<Code2 className="h-8 w-8 text-neon-purple" />}
            title="Interactive Learning"
            description="Don't just read. Type, edit, and run code to truly understand concepts."
          />
          <FeatureCard
            icon={<Terminal className="h-8 w-8 text-green-400" />}
            title="Professional UI"
            description="Learn in an environment that feels like a real developer tool (VS Code style)."
          />
        </motion.div>

        {/* Developer Card */}
        <motion.div variants={item} className="pt-20 pb-8">
           <DeveloperCard />
        </motion.div>

      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800/50">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}

function DeveloperCard() {
  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-8 shadow-2xl backdrop-blur-xl">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-neon-purple/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-neon-blue/10 blur-3xl" />
      
      <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Profile Image Placeholder */}
        <div className="flex-shrink-0">
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-slate-700 shadow-lg md:h-32 md:w-32">
             {/* Replace src with your actual image URL */}
             <img 
               src="/profile.png" 
               alt="Developer" 
               className="h-full w-full object-cover"
             />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-neon-blue">
            MEET THE PyKager
          </div>
          <h2 className="text-2xl font-bold text-white">Sujal Kalra</h2>
          <p className="mb-6 mt-2 text-slate-400">
            Hi, I’m Sujal.

I have spent the last four years learning computer science and building real software.

I created PythonGeeker to make learning Python clear, interactive, and practical by focusing on core concepts and real code execution.

This roadmap is designed to help you confidently implement Python fundamentals in real projects.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <SocialLink href="https://github.com/sujalkalra" icon={<Github size={20} />} label="GitHub" />
            <SocialLink href="https://linkedin.com/in/sujal-kalra-660190252/" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://instagram.com/compilersuji" icon={<Instagram size={20} />} label="Instagram" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
