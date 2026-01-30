import { useState } from "react";
import { Users } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios";

export function NewSuspectForm() {
  const [submitting, setSubmitting] = useState(false);
  const [phaseSus, setPhaseSus] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState(0);
  const [background, setBackground] = useState("");
  const [relationship, setRelationship] = useState("");
  const [alibi, setAlibi] = useState("");
  const [motive, setMotive] = useState("");

  const newSuspect = async () => {
    setSubmitting(true);

    if (phaseSus === 0) {
      toast.error("Please select a phase.");
      setSubmitting(false);
      return;
    }

    try {
      await api.post("/suspects/", {
        phase: phaseSus,
        name,
        role,
        age,
        background,
        relationship,
        alibi,
        motive,
      });

      console.log("Suspect created successfully.");
      toast.success("Suspect created successfully.");
      // Reset form
      setPhaseSus(0);
      setName("");
      setRole("");
      setAge(0);
      setBackground("");
      setRelationship("");
      setAlibi("");
      setMotive("");
    } catch (error) {
      console.log("Error in newSuspect:", error);
      toast.error("Failed to create suspect.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-card border border-border rounded-lg">
      <h3 className="text-xl mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Suspect Interface
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newSuspect();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Phase</label>
          <select
            value={phaseSus}
            onChange={(e) => setPhaseSus(Number(e.target.value))}
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
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Name of the suspect
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include the suspect's profession and what does the suspect do
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Suspect's age
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Background</label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Describe the suspect and any necessary information
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Relationship</label>
          <textarea
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Elaborate the relationship between the suspect and the victim
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Alibi</label>
          <textarea
            value={alibi}
            onChange={(e) => setAlibi(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include where the suspect claims to have been that night
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Motive</label>
          <textarea
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include the reasons why the suspect would attack the victim
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-colors"
        >
          Add Suspect
        </button>
      </form>
    </div>
  );
}