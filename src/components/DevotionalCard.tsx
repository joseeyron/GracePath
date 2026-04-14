import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { Devotional } from '../lib/gemini';

interface DevotionalCardProps {
  devotional: Devotional;
}

export function DevotionalCard({ devotional }: DevotionalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="bg-warm-card rounded-[32px] p-8 md:p-12 shadow-sm border border-stone-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Quote size={120} />
        </div>

        <div className="relative space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-warm-accent uppercase tracking-[0.2em] text-xs font-bold font-sans">
              <Sparkles size={14} />
              Daily Devotional
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 leading-tight">
              {devotional.title}
            </h2>
          </div>

          <div className="bg-warm-bg/50 rounded-2xl p-8 border-l-4 border-warm-accent italic">
            <p className="text-xl md:text-2xl text-stone-800 leading-relaxed">
              "{devotional.verse}"
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
              <BookOpen size={20} className="text-warm-accent" />
              Reflection
            </h3>
            <div className="text-lg text-stone-600 font-sans leading-relaxed space-y-4 whitespace-pre-wrap">
              {devotional.reflection}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-stone-100">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                <Heart size={18} className="text-warm-accent" />
                Prayer
              </h3>
              <p className="text-stone-600 font-sans italic leading-relaxed">
                {devotional.prayer}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                <ArrowRight size={18} className="text-warm-accent" />
                Application
              </h3>
              <p className="text-stone-600 font-sans leading-relaxed">
                {devotional.application}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
