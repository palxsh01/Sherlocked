import { useState } from 'react';
import { UserCircle, Check, X } from 'lucide-react';

interface Suspect {
  id: string;
  name: string;
  role: string;
  age: number;
  background: string;
  relationship: string;
  alibi: string;
  motive: string;
  evidenceLinks: string[];
}

const suspects: Suspect[] = [
  {
    id: 's1',
    name: 'Dr. Rebecca Martinez',
    role: 'Associate Professor, Biology Department',
    age: 42,
    background:
      'Tenured professor with 15 years at the university. Known for ambitious research projects and competitive nature. Recently passed over for department chair position that went to the victim.',
    relationship: 'Professional rival and colleague',
    alibi:
      'Claims she was at home alone working on grant proposals. No witnesses. Phone location data shows phone was at her residence, but she could have left it there.',
    motive:
      'Long-standing professional rivalry over research funding and academic recognition. Recent email exchanges show escalating tension. The victim allegedly had evidence of research misconduct.',
    evidenceLinks: ['Email Thread - Faculty Dispute', 'Financial Records'],
  },
  {
    id: 's2',
    name: 'Sarah Kim',
    role: 'Graduate Student, Research Assistant',
    age: 26,
    background:
      'Brilliant third-year Ph.D. student working under Prof. Chen. Reputation as hardworking and dedicated. Recently expressed concerns about her thesis timeline and funding.',
    relationship: 'Student and research assistant to the victim',
    alibi:
      'States she was supposed to meet Prof. Chen at 11:30 PM but arrived late (11:50 PM). Claims she was at the library earlier but left at 10:30 PM. Coffee shop receipt confirms purchase at 11:00 PM.',
    motive:
      'Potentially frustrated with demanding supervisor. Victim controlled her funding and thesis approval. However, had strong professional relationship and career depended on his support.',
    evidenceLinks: ['Witness Statement - Graduate Student', "Victim's Phone - Last Calls"],
  },
  {
    id: 's3',
    name: 'Thomas Park',
    role: 'Head Janitor, Facilities Department',
    age: 51,
    background:
      '20 years at the university. Quiet, reliable employee. Recently filed complaints about professor mistreatment. Has access to all campus buildings at night.',
    relationship: 'University staff member',
    alibi:
      'Was working night shift cleaning the science building. Security logs confirm he badged into the building at 10:00 PM but no record of leaving or entering other buildings. Says he never left the science building.',
    motive:
      'Prof. Chen filed multiple complaints about cleaning standards, threatened Thomas\'s job security. Had heated confrontation two weeks prior. However, Thomas has no history of violence.',
    evidenceLinks: ['Financial Records', 'Physical Evidence - Weapon'],
  },
  {
    id: 's4',
    name: 'Detective James Morrison',
    role: 'Campus Police Department',
    age: 38,
    background:
      'Former city police detective, joined campus security 3 years ago. Known as thorough investigator. Has history with the victim from previous incident.',
    relationship: 'Campus security',
    alibi:
      'On duty but claims he was on patrol on the opposite side of campus when the incident occurred. Dashboard camera shows his patrol car in that area at 11:30 PM, but there\'s a 20-minute gap in footage.',
    motive:
      'Prof. Chen filed formal complaint against Morrison last year alleging harassment during investigation of lab break-in. Could have held grudge. But professional reputation would be ruined if caught.',
    evidenceLinks: ['Witness Statement - Campus Security Guard', 'Security Footage - Parking Lot'],
  },
  {
    id: 's5',
    name: 'Marcus Thompson',
    role: 'Night Security Guard',
    age: 29,
    background:
      'Part-time security guard, full-time law student. Generally observant and conscientious. First on scene after the murder.',
    relationship: 'Campus security',
    alibi:
      'Was on duty making rounds. First to discover the body and call for help. Timeline accounts for his movements, supported by security badge scans.',
    motive:
      'No apparent motive. Did not know victim personally. However, was first on scene and had opportunity to disturb evidence.',
    evidenceLinks: ['Witness Statement - Campus Security Guard', 'Crime Scene Photo - Library Entrance'],
  },
];

export function SuspectsPage() {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(suspects[0]);
  const [suspectStatus, setSuspectStatus] = useState<Record<string, 'cleared' | 'suspected' | null>>({});

  const toggleSuspectStatus = (id: string, status: 'cleared' | 'suspected') => {
    setSuspectStatus((prev) => ({
      ...prev,
      [id]: prev[id] === status ? null : status,
    }));
  };

  

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Suspect Profiles</h2>
        <p className="text-muted-foreground">
          Review detailed information about each person of interest. Track your investigation progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suspects List */}
        <div className="lg:col-span-1 space-y-3">
          {suspects.map((suspect) => (
            <button
              key={suspect.id}
              onClick={() => setSelectedSuspect(suspect)}
              className={`w-full text-left p-4 rounded-lg border transition-all relative ${
                selectedSuspect?.id === suspect.id
                  ? 'bg-primary/10 border-primary'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <UserCircle className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium mb-1">{suspect.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{suspect.role}</div>
                  
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSuspectStatus(suspect.id, 'cleared');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                    suspectStatus[suspect.id] === 'cleared'
                      ? 'bg-green-600 text-white'
                      : 'bg-muted hover:bg-green-600/20'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  Cleared
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSuspectStatus(suspect.id, 'suspected');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                    suspectStatus[suspect.id] === 'suspected'
                      ? 'bg-red-600 text-white'
                      : 'bg-muted hover:bg-red-600/20'
                  }`}
                >
                  <X className="w-3 h-3" />
                  Suspect
                </button>
              </div>
            </button>
          ))}
        </div>

        {/* Suspect Details */}
        <div className="lg:col-span-2">
          {selectedSuspect && (
            <div className="p-6 bg-card border border-border rounded-lg space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-16 h-16 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-1">{selectedSuspect.name}</h3>
                  <p className="text-muted-foreground mb-2">{selectedSuspect.role}</p>
                  <div className="flex gap-2 flex-wrap">
                    
                    <div className="inline-block px-3 py-1 rounded-full text-sm bg-muted">
                      Age {selectedSuspect.age}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Sections */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Background</div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="leading-relaxed">{selectedSuspect.background}</p>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Relationship to Victim</div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="leading-relaxed">{selectedSuspect.relationship}</p>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Alibi</div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="leading-relaxed">{selectedSuspect.alibi}</p>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Potential Motive</div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="leading-relaxed">{selectedSuspect.motive}</p>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Related Evidence</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSuspect.evidenceLinks.map((link) => (
                      <div
                        key={link}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm border border-primary/20"
                      >
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
