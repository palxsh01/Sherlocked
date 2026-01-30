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

import { useApp } from "../context/AppContext";
import { NewEvidenceForm } from "../components/newEvidenceForm";
import { NewSuspectForm } from "../components/newSuspectForm.tsx";
import api from "../lib/axios";

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const { settings, settingsLoading, refreshSettings } = useApp();

  const fetchSettings = async () => {
    await refreshSettings();
  };

  useEffect(() => {
    if (!settingsLoading) {
      setLoading(false);
    }
  }, [settingsLoading]);

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
    } catch (error) {
      console.log("Error in startEvent:", error);
    } finally {
      setLoading(false);
    }
  };

  const pauseEvent = async () => {
    setLoading(true);

    if (settings && settings.endTime !== null) {
      const now = new Date();
      const endTime = new Date(settings.endTime);
      const remaining = endTime.getTime() - now.getTime();
      const remainingDuration = remaining > 0 ? remaining : 0;

      try {
        await api.put("/settings/pause", {
          remainingDuration,
        });

        fetchSettings();
      } catch (error) {
        console.log("Error in pauseEvent:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const resumeEvent = async () => {
    const now = new Date();
    const remainingDuration = settings?.remainingDuration || 0;
    const end = new Date(now.getTime() + remainingDuration);
    const endTime = end.toISOString();

    try {
      await api.put("/settings/resume", {
        endTime,
      });

      fetchSettings();
    } catch (error) {
      console.log("Error in resumeEvent:", error);
    } finally {
      setLoading(false);
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
      } catch (error) {
        console.log("Error in resetEvent:", error);
      } finally {
        setLoading(false);
      }

      fetchSettings();

      localStorage.removeItem("sherlocked_progress");
    }
  };

  const releaseNextWave = async () => {
    setLoading(true);

    if (settings && settings.currentPhase < settings.maxPhases) {
      const currentPhase = settings.currentPhase + 1;

      console.log(currentPhase);

      try {
        await api.put("/settings/phase", {
          currentPhase,
        });

        fetchSettings();
      } catch (error) {
        console.log("Error in releaseNextPhase:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading || !settings) {
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
                settings.isActive
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
                  settings.isActive ? "text-green-500" : "text-red-500"
                }
              >
                {settings.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {settings.startTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span>
                  {new Date(settings.startTime).toLocaleTimeString()}
                </span>
              </div>
            )}
            {settings.endTime && settings.startTime && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ends:</span>
                  <span>
                    {new Date(settings.endTime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Phase:</span>
                  <span>
                    {settings.currentPhase} / {settings.maxPhases}
                  </span>
                </div>
              </>
            )}
            {!settings.endTime && settings.startTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ends:</span>
                <span>Paused</span>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-3">
            {!settings.startTime && (
              <button
                onClick={startEvent}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Event
              </button>
            )}
            {!settings.isActive && settings.startTime && (
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
            {settings.isActive && (
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
              {settings.currentPhase >= settings.maxPhases ? (
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
                      Phase {settings.currentPhase + 1}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Next evidence set
                    </div>
                  </div>
                  <button
                    onClick={releaseNextWave}
                    disabled={!settings.isActive}
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
        <NewEvidenceForm />

        {/* New Suspect Card */}
        <NewSuspectForm />
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