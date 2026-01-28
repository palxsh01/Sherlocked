import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCircle, Check, X, Lock, LoaderIcon } from 'lucide-react';
import { type EventSettings } from "../lib/settingsInterface";
import { type Suspect } from "../lib/suspectInterface";
import api from '../lib/axios';


export function SuspectsPage() {
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [suspectStatus, setSuspectStatus] = useState<Record<string, 'cleared' | 'suspected' | null>>({});
  const [settings, setSettings] = useState<EventSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [suspectsLoaded, setSuspectsLoaded] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        console.log("Settings fetched:", res.data);
        setSettings(res.data);
      } catch (error) {
        console.log("Error in fetchSettings:", error);
      } finally {
        setSettingsLoaded(true);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchSuspects = async () => {
      try {
        const res = await api.get("/suspects");
        console.log("Suspects fetched:", res.data);
        setSuspects(res.data);
      } catch (error) {
        console.log("Error in fetchSuspects:", error);
      } finally {
        setSuspectsLoaded(true);
      }
    }
  
    fetchSuspects();
  }, []);

  useEffect(() => {
    if (settingsLoaded && suspectsLoaded) {
      setLoading(false);
    }
  }, [settingsLoaded, suspectsLoaded]);

  const toggleSuspectStatus = (id: string, status: 'cleared' | 'suspected') => {
    setSuspectStatus((prev) => ({
      ...prev,
      [id]: prev[id] === status ? null : status,
    }));
  };

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

  const availableSuspects = suspects.filter(
    (s) => s.phase <= settings[0].currentPhase,
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Suspect Profiles</h2>
        <p className="text-muted-foreground">
          Review detailed information about each person of interest. Track your investigation progress.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          {settings[0].currentPhase === 0 ? (
            <span className="text-sm">Suspect profiles are yet to be released</span>
          ) : (
            <span className="text-sm">
              Phase {settings[0].currentPhase} is Live
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suspects List */}
        <div className="lg:col-span-1 space-y-3">
          {availableSuspects.map((suspect) => (
            <button
              key={suspect._id}
              onClick={() => setSelectedSuspect(suspect)}
              className={`w-full text-left p-4 rounded-lg border transition-all relative ${
                selectedSuspect?._id === suspect._id
                  ? 'bg-primary/10 border-primary'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <UserCircle className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium mb-1">
                    {suspect.name}
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-1">
                    {suspect.role}
                  </div>
                  <div className="mt-2 text-xs text-primary">
                      Phase {suspect.phase}
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSuspectStatus(suspect._id, 'cleared');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                    suspectStatus[suspect._id] === 'cleared'
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
                    toggleSuspectStatus(suspect._id, 'suspected');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                    suspectStatus[suspect._id] === 'suspected'
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

          {/* Locked Suspect Indicators */}
          {availableSuspects.length === 0 &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`locked-${i}`}
                className="w-full p-4 rounded-lg border border-dashed border-border bg-muted/50 opacity-50"
              >
                <div className="flex items-start gap-3">
                  <Lock className="w-10 h-10 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium mb-1">Locked Suspect Profile</div>
                    <div className="text-sm text-muted-foreground">
                      More suspect profiles will be released soon
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Suspect Details */}
        <div className="lg:col-span-2">
          {selectedSuspect ? (
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
                      Age: {selectedSuspect.age}
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
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 bg-card border border-dashed border-border rounded-lg">
              <div className="text-center">
                <UserCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Select a suspect to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
