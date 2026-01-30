import { useState } from "react";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios";

export function NewEvidenceForm() {
  const [submitting, setSubmitting] = useState(false);
  const [phaseEv, setPhaseEv] = useState(0);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const newEvidence = async () => {
    setSubmitting(true);

    if (phaseEv === 0) {
      toast.error("Please select a phase.");
      setSubmitting(false);
      return;
    }

    const mediaUrls = media
      .split(/[,\n]/) 
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    try {
      await api.post("/evidence/", {
        phase: phaseEv,
        title,
        type,
        media: mediaUrls,
        description,
        details,
      });

      console.log("Evidence created successfully.");
      toast.success("Evidence created successfully.");
      // Reset form
      setPhaseEv(0);
      setTitle("");
      setType("");
      setMedia("");
      setDescription("");
      setDetails("");
    } catch (error) {
      console.log("Error in newEvidence:", error);
      toast.error("Failed to create evidence.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-card border border-border rounded-lg">
      <h3 className="text-xl mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5" />
        New Evidence
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newEvidence();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Phase</label>
          <select
            value={phaseEv}
            onChange={(e) => setPhaseEv(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            required
          >
            <option value={0}>Select phase</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Select the phase to release in
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Name the evidence
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            required
          >
            <option value="">Select type</option>
            <option value="photo">Photo</option>
            <option value="document">Document</option>
            <option value="digital">Digital</option>
            <option value="forensic">Forensic</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Select what type of media the evidence is
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Media URLs
          </label>
          <textarea
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={3}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Separate multiple URLs with commas or place each on a new line
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Add a brief overview of what the evidence is
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include all necessary details regarding the evidence
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-colors"
        >
          Add Evidence
        </button>
      </form>
    </div>
  );
}