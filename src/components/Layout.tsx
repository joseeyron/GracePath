import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-warm-bg selection:bg-warm-accent selection:text-white">
      <header className="border-b border-stone-200 bg-warm-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warm-accent flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 font-serif">GracePath</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-warm-accent transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-warm-accent transition-colors">My Goals</a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-warm-accent transition-colors">Resources</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-stone-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-stone-500">
            <Heart size={16} className="text-warm-accent" />
            <span className="text-sm">Built for your spiritual journey</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-stone-400">
            <a href="#" className="hover:text-stone-600">Privacy</a>
            <a href="#" className="hover:text-stone-600">Terms</a>
            <a href="#" className="hover:text-stone-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
