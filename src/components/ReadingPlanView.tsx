import React from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { ReadingPlan } from '../lib/gemini';
import { cn } from '../lib/utils';

interface ReadingPlanViewProps {
  plan: ReadingPlan;
}

export function ReadingPlanView({ plan }: ReadingPlanViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-warm-card rounded-[32px] p-8 md:p-12 shadow-sm border border-stone-100">
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-2 text-warm-accent uppercase tracking-[0.2em] text-xs font-bold font-sans">
            <Calendar size={14} />
            Structured Reading Plan
          </div>
          <h2 className="text-4xl font-semibold text-stone-900">
            {plan.title}
          </h2>
          <p className="text-lg text-stone-500 font-sans max-w-2xl">
            {plan.description}
          </p>
        </div>

        <div className="space-y-4">
          {plan.dailyTasks.map((task, index) => (
            <motion.div
              key={task.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl",
                "bg-warm-bg/30 border border-stone-100 hover:bg-white hover:shadow-md transition-all duration-300"
              )}
            >
              <div className="flex items-center gap-4 md:w-32 shrink-0">
                <div className="w-10 h-10 rounded-full bg-warm-accent/10 flex items-center justify-center text-warm-accent font-bold font-sans">
                  {task.day}
                </div>
                <span className="text-sm font-bold text-stone-400 uppercase tracking-widest md:hidden">Day</span>
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-xl font-semibold text-stone-900 group-hover:text-warm-accent transition-colors">
                  {task.passage}
                </h4>
                <p className="text-stone-500 font-sans">
                  {task.focus}
                </p>
              </div>

              <div className="md:w-12 flex justify-end">
                <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-300 hover:border-warm-accent hover:text-warm-accent transition-all">
                  <CheckCircle2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
