import { useState, useEffect } from "react";
import {
  Settings,
  Play,
  Pause,
  Users,
  Eye,
  LoaderIcon,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import { type EventSettings } from "../lib/settingsInterface";
import api from "../lib/axios";

export function AdminDashboard() {
  const [settings, setSettings] = useState<EventSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [phaseEv, setPhaseEv] = useState(0);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [phaseSus, setPhaseSus] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState(0);
  const [background, setBackground] = useState("");
  const [relationship, setRelationship] = useState("");
  const [alibi, setAlibi] = useState("");
  const [motive, setMotive] = useState("");

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

  useEffect(() => {
    fetchSettings();
  }, []);

  const startEvent = async () => {
    setLoading(true);
    const now = new Date();
    const end = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const startTime = now.toISOString();
    const endTime = end.toISOString();

    try {
      await api.put("settings/start", {
        startTime,
        endTime,
      });

      fetchSettings();

      console.log("Successful Start.");
    } catch (error) {
      console.log("Error in startEvent:", error);
    } finally {
      setLoading(false);
    }
  };

  const pauseEvent = async () => {
    setLoading(true);

    if (settings[0].endTime !== null) {
      const now = new Date();
      const endTime = new Date(settings[0].endTime);
      const remaining = endTime.getTime() - now.getTime();
      const remainingDuration = remaining > 0 ? remaining : 0;

      try {
        await api.put("/settings/pause", {
          remainingDuration,
        });

        fetchSettings();

        console.log("Successful Pause.");
      } catch (error) {
        console.log("Error in pauseEvent:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const resumeEvent = async () => {
    const now = new Date();
    const remainingDuration = settings[0].remainingDuration || 0;
    const end = new Date(now.getTime() + remainingDuration);
    const endTime = end.toISOString();

    try {
      await api.put("/settings/resume", {
        endTime,
      });

      fetchSettings();

      console.log("Successful Resume.");
    } catch (error) {
      console.log("Error in resumeEvent:", error);
    } finally {
      setLoading(false);
    }
  };

  const releaseNextWave = async () => {
    setLoading(true);

    if (settings[0].currentPhase < settings[0].maxPhases) {
      const currentPhase = settings[0].currentPhase + 1;

      console.log(currentPhase);

      try {
        await api.put("/settings/phase", {
          currentPhase,
        });

        fetchSettings();

        console.log("Next Phase Successful.");
      } catch (error) {
        console.log("Error in releaseNextPhase:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetEvent = async () => {
    if (
      confirm(
        "Are you sure you want to reset the entire event? This will clear all progress.",
      )
    ) {
      try {
        setLoading(true);

        await api.put("settings/reset");
        console.log("Successful Reset.");
      } catch (error) {
        console.log("Error in resetEvent:", error);
      } finally {
        setLoading(false);
      }

      fetchSettings();

      localStorage.removeItem("sherlocked_progress");
    }
  };

  const newEvidence = async () => {
    setSubmitting(true);

    if (!title.trim()) {
      toast.error("All fields are required.");
      setSubmitting(false);
      return;
    }

    try {
      await api.post("/evidence/", {
        phase: phaseEv,
        title,
        type,
        media,
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

  const newSuspect = async () => {
    setSubmitting(true);

    if (!name.trim()) {
      toast.error("All fields are required.");
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

  if (loading || !settings.length) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <Settings className="w-8 h-8 text-primary" />
        <h2 className="text-3xl">Admin Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Event Status Card */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            Event Status
            <div
              className={`size-3 rounded-full ${
                settings[0].isActive
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></div>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span
                className={
                  settings[0].isActive ? "text-green-500" : "text-red-500"
                }
              >
                {settings[0].isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {settings[0].startTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span>
                  {new Date(settings[0].startTime).toLocaleTimeString()}
                </span>
              </div>
            )}
            {settings[0].endTime && settings[0].startTime && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ends:</span>
                  <span>
                    {new Date(settings[0].endTime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Phase:</span>
                  <span>
                    {settings[0].currentPhase} / {settings[0].maxPhases}
                  </span>
                </div>
              </>
            )}
            {!settings[0].endTime && settings[0].startTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ends:</span>
                <span>Paused</span>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-3">
            {!settings[0].startTime && (
              <button
                onClick={startEvent}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Event
              </button>
            )}
            {!settings[0].isActive && settings[0].startTime && (
              <>
                <button
                  onClick={resumeEvent}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Resume Event
                </button>
                <button
                  onClick={resetEvent}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                >
                  <RotateCcw className="size-4" />
                  Reset Event
                </button>
              </>
            )}
            {settings[0].isActive && (
              <>
                <button
                  onClick={pauseEvent}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause Event
                </button>
                <button
                  onClick={resetEvent}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                >
                  <RotateCcw className="size-4" />
                  Reset Event
                </button>
              </>
            )}
          </div>
        </div>

        {/* Evidence Management Card */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl mb-4">Evidence Management</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              {settings[0].currentPhase >= settings[0].maxPhases ? (
                <>
                  <div>
                    <div className="font-medium">
                      All Evidence has been released.
                    </div>
                  </div>
                  <button
                    onClick={releaseNextWave}
                    disabled={true}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-colors"
                  >
                    Release
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div className="font-medium">
                      Phase {settings[0].currentPhase + 1}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Next evidence set
                    </div>
                  </div>
                  <button
                    onClick={releaseNextWave}
                    disabled={!settings[0].isActive}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-colors"
                  >
                    Release
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* New Evidence Card */}
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
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Media URL
              </label>
              <input
                type="text"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                rows={2}
                required
              />
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

        {/* New Suspect Interface */}
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
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
              />
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
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="text-sm text-foreground/90">
          <strong>Admin Controls:</strong> Use this dashboard to manage the
          event flow. All settings are saved automatically.
        </div>
      </div>
    </div>
  );
}
