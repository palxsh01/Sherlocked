import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import api from "../lib/axios";
import {
  FileText,
  Image as ImageIcon,
  Phone,
  AlertCircle,
  Lock,
  LoaderIcon,
} from "lucide-react";

interface Evidence {
  _id: string;
  phase: number;
  title: string;
  type: "photo" | "document" | "digital" | "forensic";
  media: string;
  description: string;
  details: string;
}

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
    };

    fetchEvidence();
  }, []);

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
    );
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
            <span className="text-sm">Evidence is yet to be released</span>
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
          {availableEvidence.length === 0 &&
            Array.from({ length: 3 }).map(
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
                {selectedEvidence.media && (
                  <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Evidence Media:
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <img
                      src={selectedEvidence.media}
                      alt={selectedEvidence.title}
                      className="max-h-96 w-full object-contain rounded-md"
                      loading="lazy"
                    />
                  </div>
                </div>
                )}
              
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
