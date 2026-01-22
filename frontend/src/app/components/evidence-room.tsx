import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import api from '../../../lib/axios';
import {
  FileText,
  Image as ImageIcon,
  Phone,
  AlertCircle,
  Lock,
  LoaderIcon
} from "lucide-react";

interface Evidence {
  _id: string;
  phase: number;
  title: string;
  type: "photo" | "document" | "digital" | "forensic";
  media?: unknown;
  description: string;
  details: string;
}

// const evidenceData: Evidence[] = [
//   // Phase 1
//   {
//     id: "e1",
//     phase: 1,
//     title: "Crime Scene Photo - Library Entrance",
//     type: "photo",
//     description: "Wide shot of the library entrance where the victim was found",
//     details:
//       "The photograph shows the main entrance to the campus library at approximately 11:45 PM. Visible bloodstains on the marble floor near the revolving door. The victim's briefcase lies open, contents scattered. Security camera above the entrance appears to be covered with black cloth.",
//   },
//   {
//     id: "e2",
//     phase: 1,
//     title: "Witness Statement - Campus Security Guard",
//     type: "document",
//     description: "Statement from Marcus Thompson, night shift security",
//     details:
//       "Marcus Thompson states he was making his rounds when he heard a loud argument near the library around 11:30 PM. He claims he saw two figures in the distance but couldn't make out details. When he arrived at the scene 15 minutes later, he found the victim. He immediately called campus police. Notable: He mentioned hearing a car speed away around 11:40 PM.",
//   },
//   {
//     id: "e3",
//     phase: 1,
//     title: "Victim's Phone - Last Calls",
//     type: "digital",
//     description: "Call log from victim's mobile phone",
//     details:
//       'Last incoming call: 11:15 PM from unknown number (duration: 3 minutes). Last outgoing call: 10:47 PM to "Office" (duration: 1 minute). Three missed calls from "Sarah" between 11:20-11:35 PM. Text message at 11:25 PM to unknown number: "I have the evidence. Meet me at the usual spot."',
//   },
//   // Phase 2
//   {
//     id: "e4",
//     phase: 2,
//     title: "Forensic Report - Time of Death",
//     type: "forensic",
//     description: "Medical examiner's preliminary findings",
//     details:
//       "Time of death estimated between 11:30 PM and 11:45 PM. Cause: Blunt force trauma to the head, consistent with a heavy object. Found traces of concrete dust on victim's clothing. No defensive wounds, suggesting the victim may have known the attacker. Blood alcohol level: 0.00% - victim was sober.",
//   },
//   {
//     id: "e5",
//     phase: 2,
//     title: "Email Thread - Faculty Dispute",
//     type: "digital",
//     description: "Recovered emails from victim's university account",
//     details:
//       "Email exchange dated one week prior between victim (Prof. James Chen) and Dr. Rebecca Martinez regarding research funding allocation. Tone increasingly hostile. Last email from victim at 6:00 PM day of murder: \"This isn't over. I've documented everything and I'm not afraid to take this to the board.\" Dr. Martinez's reply: \"You're making a terrible mistake.\"",
//   },
//   {
//     id: "e6",
//     phase: 2,
//     title: "Security Footage - Parking Lot",
//     type: "photo",
//     description: "Timestamp: 11:42 PM from adjacent parking lot camera",
//     details:
//       'Grainy footage shows a dark sedan (appears to be a BMW) leaving the parking lot at high speed at 11:42 PM. License plate partially visible: starts with "7KM". Two people visible in front seats but faces not clear. The passenger appears to be holding something cylindrical.',
//   },
//   // Phase 3
//   {
//     id: "e7",
//     phase: 3,
//     title: "Witness Statement - Graduate Student",
//     type: "document",
//     description: "Statement from Sarah Kim, victim's research assistant",
//     details:
//       'Sarah Kim admits she was supposed to meet Prof. Chen at 11:30 PM to discuss her thesis. She claims she was running late (arrived at 11:50 PM) and found the police already there. She states the Professor had been acting paranoid lately, mentioning he had "proof of something big" but wouldn\'t elaborate. She owns a grey Honda Civic, not a BMW.',
//   },
//   {
//     id: "e8",
//     phase: 3,
//     title: "Financial Records",
//     type: "document",
//     description: "Recent banking transactions flagged by investigators",
//     details:
//       'Large deposit of $50,000 into Dr. Rebecca Martinez\'s account three days before the murder, source: "Research Grant Foundation." Victim\'s bank records show he withdrew $5,000 cash two days prior. Credit card purchase: Hardware store receipt for "industrial rope and tarp" charged to account belonging to Thomas Park (campus janitor) on day of murder.',
//   },
//   {
//     id: "e9",
//     phase: 3,
//     title: "Physical Evidence - Weapon",
//     type: "forensic",
//     description: "Item recovered from nearby storm drain",
//     details:
//       "A concrete bookend recovered from storm drain 50 feet from crime scene. Bloodstains match victim's blood type. Partial fingerprint lifted but smudged - preliminary match to university database suggests connection to faculty member. Bookend is part of a set typically found in faculty offices. Serial number traces to the library's collection.",
//   },
// ];

export function EvidenceRoom() {
  const { eventSettings } = useApp();
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await api.get("/evidence");
        console.log(res.data);
        setEvidence(res.data);
      } catch (error) {
        console.log("Error in fetchEvidence, ", error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchEvidence();
  }, [])

  const availableEvidence = evidence.filter(
    (e) => e.phase <= eventSettings.currentWave
  );

  const getIcon = (type: Evidence["type"]) => {
    switch (type) {
      case "photo":
        return ImageIcon;
      case "document":
        return FileText;
      case "digital":
        return Phone;
      case "forensic":
        return AlertCircle;
    }
  };

  if (!eventSettings.isActive && !eventSettings.startTime) {
    return (
      <div className="text-center py-12">
        <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl mb-2">The event is not live right now.</h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">The Evidence Room</h2>
        <p className="text-muted-foreground">
          Examine all available evidence carefully. New evidence will be
          released in phases.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          {eventSettings.currentWave === 0 ? (
             <span className="text-sm">
             Evidence is yet to be released
           </span>
          ) : (
          <span className="text-sm">
            Phase {eventSettings.currentWave} is Live
          </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence List */}
        <div className="lg:col-span-1 space-y-3">
          {availableEvidence.map((evidence) => {
            const Icon = getIcon(evidence.type);
            return (
              <button
                key={evidence._id}
                onClick={() => setSelectedEvidence(evidence)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedEvidence?._id === evidence._id
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium mb-1 line-clamp-2">
                      {evidence.title}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {evidence.description}
                    </div>
                    <div className="mt-2 text-xs text-primary">
                      Phase {evidence.phase}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Locked Evidence Indicators */}
          {eventSettings.currentWave < eventSettings.maxWaves &&
            Array.from({ length: 3 - availableEvidence.length / 3 }).map(
              (_, i) => (
                <div
                  key={`locked-${i}`}
                  className="w-full p-4 rounded-lg border border-dashed border-border bg-muted/50 opacity-50"
                >
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Locked Evidence</div>
                      <div className="text-sm text-muted-foreground">
                        More evidence will be released soon
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>

        {/* Evidence Details */}
        <div className="lg:col-span-2">
          {selectedEvidence ? (
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="flex items-start gap-3 mb-4">
                {(() => {
                  const Icon = getIcon(selectedEvidence.type);
                  return (
                    <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  );
                })()}
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{selectedEvidence.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvidence.description}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border my-6"></div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Evidence Details:
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="leading-relaxed whitespace-pre-line">
                      {selectedEvidence.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full capitalize">
                    {selectedEvidence.type}
                  </div>
                  <div className="text-muted-foreground">
                    Phase {selectedEvidence.phase}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 bg-card border border-dashed border-border rounded-lg">
              <div className="text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  Select an evidence item to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
