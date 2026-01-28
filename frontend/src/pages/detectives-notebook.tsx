import { BookOpen, Lightbulb, Target, AlertTriangle, CheckCircle, Lock, LoaderIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { type EventSettings } from "../lib/settingsInterface";
import { useState, useEffect } from 'react';
import api from '../lib/axios';

const tips = [
  {
    id: 't1',
    category: 'Investigation Approach',
    icon: Target,
    title: 'Start with the Timeline',
    content:
      'Map out the events chronologically. Who was where and when? Look for gaps in alibis and overlapping timeframes. The murder occurred between 11:30-11:45 PM - focus on movements during this window.',
  },
  {
    id: 't2',
    category: 'Evidence Analysis',
    icon: AlertTriangle,
    title: 'Cross-Reference Everything',
    content:
      'Don\'t view evidence in isolation. Connect witness statements with physical evidence, digital records with alibis. Look for contradictions - they often reveal the truth.',
  },
  {
    id: 't3',
    category: 'Logical Fallacies',
    icon: Lightbulb,
    title: 'Avoid Confirmation Bias',
    content:
      'Don\'t latch onto your first suspect and ignore contradicting evidence. Stay objective. The most obvious suspect might be a red herring. Consider all possibilities before drawing conclusions.',
  },
  {
    id: 't4',
    category: 'Interrogation Techniques',
    icon: BookOpen,
    title: 'Focus on Motive and Opportunity',
    content:
      'A suspect needs both motive (why they would do it) and opportunity (ability to commit the crime). Someone with strong motive but no opportunity likely isn\'t your killer.',
  },
  {
    id: 't5',
    category: 'Documentation',
    icon: CheckCircle,
    title: 'Document Your Findings',
    content:
      'Keep notes on connections you discover. Write down questions that arise. Sometimes the answer reveals itself when you organize your thoughts systematically.',
  },
  {
    id: 't6',
    category: 'Common Pitfalls',
    icon: AlertTriangle,
    title: 'Watch for False Alibis',
    content:
      'An alibi is only as good as its verification. "I was home alone" isn\'t verified. Phone location can be spoofed or phones can be left behind. Look for concrete proof.',
  },
  {
    id: 't7',
    category: 'Evidence Analysis',
    icon: Lightbulb,
    title: 'Physical Evidence is Key',
    content:
      'Witnesses can lie or misremember. Physical evidence doesn\'t lie, but it can be misinterpreted. The weapon, DNA, fingerprints - these connect directly to the perpetrator.',
  },
  {
    id: 't8',
    category: 'Investigation Approach',
    icon: Target,
    title: 'Follow the Money',
    content:
      'Financial transactions often reveal motive. Large deposits, suspicious purchases, money troubles - these can indicate desperation or preparation for a crime.',
  },
];

export function DetectivesNotebook() {
  const [settings, setSettings] = useState<EventSettings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        console.log(res.data);
        setSettings(res.data); //Settings array will only contain one object, hence using settings[0] henceforth.
      } catch (error) {
        console.log("Error in fetchSettings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  if (loading || !settings.length) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!settings[0].isActive && !settings[0].startTime) {
    return (
      <div className="text-center py-12">
        <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl mb-2">The event is not live right now.</h3>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Detective's Notebook</h2>
        <p className="text-muted-foreground">
          General guidance and tips to help you solve the case. Use these principles to analyze evidence and suspects.
        </p>
      </div>

      {/* Investigation Tips */}
      <div className="mb-12">
        <h3 className="text-2xl mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Investigation Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className="p-5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-primary mb-1 uppercase tracking-wide">{tip.category}</div>
                    <h4 className="font-medium">{tip.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Reminders */}
      <div>
        <h3 className="text-2xl mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-primary" />
          Important Reminders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2">Document Your Theories</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              As you review evidence, write down connections and inconsistencies. Sometimes patterns emerge when you
              organize information visually.
            </p>
          </div>
          <div className="p-5 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2">Question Everything</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Just because someone says something doesn't make it true. Look for corroborating evidence. Even security
              guards and police can be unreliable or complicit.
            </p>
          </div>
          <div className="p-5 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2">Time is Limited</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You have 3 hours to solve this case. Use your time wisely. Review all evidence before making final
              conclusions, but don't get stuck on one piece of information.
            </p>
          </div>
          <div className="p-5 bg-card border border-border rounded-lg">
            <h4 className="font-medium mb-2">Work Together</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If working in teams, discuss your findings. Different perspectives can reveal insights you might miss
              alone. But ultimately, trust your detective instincts.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <p className="text-sm text-foreground/90 text-center">
          <strong>Remember:</strong> Every detective approaches cases differently. These are guidelines, not rules. Trust
          your instincts, follow the evidence, and most importantly - enjoy the investigation!
        </p>
      </div>
    </div>
  );
}
