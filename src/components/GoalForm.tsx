import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Target } from 'lucide-react';
import { cn } from '../lib/utils';

interface GoalFormProps {
  onSubmit: (goal: string) => void;
  isLoading: boolean;
}

export function GoalForm({ onSubmit, isLoading }: GoalFormProps) {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-warm-card rounded-[32px] p-8 md:p-12 shadow-sm border border-stone-100"
    >
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-bg text-warm-accent mb-4">
          <Target size={32} />
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 leading-tight">
          What is your heart seeking today?
        </h2>
        <p className="text-lg text-stone-500 font-sans max-w-lg mx-auto">
          Share your faith goals or spiritual challenges, and we'll prepare a personalized devotional and reading plan for you.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="relative group">
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., I want to find more peace in my daily work, or I want to grow in patience with my family..."
              className={cn(
                "w-full min-h-[160px] p-6 rounded-2xl bg-warm-bg border-2 border-transparent",
                "focus:border-warm-accent focus:bg-white transition-all duration-300 outline-none",
                "text-lg font-sans text-stone-800 placeholder:text-stone-400 resize-none"
              )}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !goal.trim()}
            className={cn(
              "w-full md:w-auto px-10 py-4 rounded-full bg-warm-accent text-white font-medium text-lg",
              "hover:bg-stone-700 transition-all duration-300 flex items-center justify-center gap-2",
              "disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-warm-accent/20"
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Preparing...
              </span>
            ) : (
              <>
                Begin Journey
                <Send size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
