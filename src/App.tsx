/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { GoalForm } from './components/GoalForm';
import { DevotionalCard } from './components/DevotionalCard';
import { ReadingPlanView } from './components/ReadingPlanView';
import { generateDevotional, generateReadingPlan, Devotional, ReadingPlan } from './lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, RefreshCw, ChevronLeft } from 'lucide-react';
import { cn } from './lib/utils';

type View = 'onboarding' | 'dashboard';
type Tab = 'devotional' | 'plan';

export default function App() {
  const [view, setView] = useState<View>('onboarding');
  const [activeTab, setActiveTab] = useState<Tab>('devotional');
  const [isLoading, setIsLoading] = useState(false);
  const [goal, setGoal] = useState('');
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [readingPlan, setReadingPlan] = useState<ReadingPlan | null>(null);

  const handleGoalSubmit = async (submittedGoal: string) => {
    setIsLoading(true);
    setGoal(submittedGoal);
    try {
      const [dev, plan] = await Promise.all([
        generateDevotional(submittedGoal),
        generateReadingPlan(submittedGoal)
      ]);
      setDevotional(dev);
      setReadingPlan(plan);
      setView('dashboard');
    } catch (error) {
      console.error("Error generating content:", error);
      // In a real app, we'd show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setView('onboarding');
    setGoal('');
    setDevotional(null);
    setReadingPlan(null);
    setActiveTab('devotional');
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === 'onboarding' ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <GoalForm onSubmit={handleGoalSubmit} isLoading={isLoading} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <button 
                  onClick={handleReset}
                  className="flex items-center gap-2 text-stone-400 hover:text-warm-accent transition-colors text-sm font-medium mb-4"
                >
                  <ChevronLeft size={16} />
                  Change Goal
                </button>
                <h2 className="text-sm font-bold text-warm-accent uppercase tracking-widest font-sans">Your Journey</h2>
                <p className="text-3xl font-semibold text-stone-900">"{goal}"</p>
              </div>

              <div className="flex p-1 bg-stone-200/50 rounded-full w-fit">
                <button
                  onClick={() => setActiveTab('devotional')}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                    activeTab === 'devotional' ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  )}
                >
                  <Sparkles size={16} />
                  Devotional
                </button>
                <button
                  onClick={() => setActiveTab('plan')}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                    activeTab === 'plan' ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  )}
                >
                  <BookOpen size={16} />
                  Reading Plan
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'devotional' && devotional && (
                <motion.div
                  key="devotional-tab"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <DevotionalCard devotional={devotional} />
                </motion.div>
              )}
              {activeTab === 'plan' && readingPlan && (
                <motion.div
                  key="plan-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ReadingPlanView plan={readingPlan} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => handleGoalSubmit(goal)}
                disabled={isLoading}
                className="flex items-center gap-2 text-stone-400 hover:text-warm-accent transition-colors text-sm font-medium"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                Refresh Content
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

