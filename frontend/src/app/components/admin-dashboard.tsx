import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Settings, Play, Pause, Users, Eye, EyeOff } from "lucide-react";

export function AdminDashboard() {
  const { eventSettings, updateEventSettings } = useApp();
  const [pagesVisible, setPagesVisible] = useState({
    evidence: true,
    suspects: true,
    notebook: true,
  });

  const startEvent = () => {
    const now = new Date();
    const endTime = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours from now
    updateEventSettings({
      isActive: true,
      startTime: now.toISOString(),
      endTime: endTime.toISOString(),
      remainingDuration: null,
    });
  };

  const pauseEvent = () => {
    if (eventSettings.endTime) {
      const now = new Date();
      const endTime = new Date(eventSettings.endTime);
      const remainingDuration = endTime.getTime() - now.getTime();
      
      updateEventSettings({
        isActive: false,
        endTime: null,
        remainingDuration: remainingDuration > 0 ? remainingDuration : 0,
      });
    } else {
      updateEventSettings({
        isActive: false,
        endTime: null,
      });
    }
  };

  const resumeEvent = () => {
    const now = new Date();
    const remainingDuration = eventSettings.remainingDuration || 0;
    const endTime = new Date(now.getTime() + remainingDuration);
    
    updateEventSettings({
      isActive: true,
      endTime: endTime.toISOString(),
      remainingDuration: null,
    });
  };

  const releaseNextWave = () => {
    if (eventSettings.currentWave < eventSettings.maxWaves) {
      updateEventSettings({
        currentWave: eventSettings.currentWave + 1,
      });
    }
  };

  const resetEvent = () => {
    if (
      confirm(
        "Are you sure you want to reset the entire event? This will clear all progress."
      )
    ) {
      updateEventSettings({
        isActive: false,
        startTime: null,
        endTime: null,
        remainingDuration: null,
        currentWave: 0,
      });
      localStorage.removeItem("sherlocked_progress");
      window.location.reload();
    }
  };

  const togglePageVisibility = (page: keyof typeof pagesVisible) => {
    setPagesVisible((prev) => ({ ...prev, [page]: !prev[page] }));
  };

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
                eventSettings.isActive
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
                  eventSettings.isActive ? "text-green-500" : "text-red-500"
                }
              >
                {eventSettings.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {eventSettings.startTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span>
                  {new Date(eventSettings.startTime).toLocaleTimeString()}
                </span>
              </div>
            )}
            {eventSettings.endTime ? (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ends:</span>
                <span>
                  {new Date(eventSettings.endTime).toLocaleTimeString()}
                </span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ends:</span>
                <span>
                  Paused
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Phase:</span>
              <span>
                {eventSettings.currentWave} / {eventSettings.maxWaves}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {!eventSettings.startTime && (
              <button
                onClick={startEvent}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Event
              </button>
            )}
            {!eventSettings.isActive && eventSettings.startTime && (
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
                  className="w-full px-4 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                >
                  Reset Event
                </button>
              </>
            )}
            {eventSettings.isActive && (
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
                  className="w-full px-4 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                >
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
              <div>
                <div className="font-medium">
                  Phase {eventSettings.currentWave + 1}
                </div>
                <div className="text-sm text-muted-foreground">
                  Next evidence set
                </div>
              </div>
              <button
                onClick={releaseNextWave}
                disabled={
                  eventSettings.currentWave >= eventSettings.maxWaves ||
                  !eventSettings.isActive
                }
                className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-lg transition-colors"
              >
                Release
              </button>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>
                Wave 1: Initial crime scene photos & first witness statement
              </div>
              <div className="mt-1">
                Wave 2: Forensic reports & digital messages
              </div>
              <div className="mt-1">
                Wave 3: Final witness statements & call logs
              </div>
            </div>
          </div>
        </div>

        {/* Page Visibility Card */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Content Visibility
          </h3>
          <div className="space-y-3">
            {Object.entries(pagesVisible).map(([page, visible]) => (
              <div
                key={page}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <span className="capitalize">{page}</span>
                <button
                  onClick={() =>
                    togglePageVisibility(page as keyof typeof pagesVisible)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    visible
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  {visible ? "Visible" : "Hidden"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mock User Progress Card */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Progress (Mock Data)
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Total Participants</div>
                <div className="text-2xl text-primary">47</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Viewed all evidence:
                </span>
                <span>32 (68%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Checked all suspects:
                </span>
                <span>28 (59%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Active investigators:
                </span>
                <span className="text-green-500">19</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="text-sm text-foreground/90">
          <strong>Admin Controls:</strong> Use this dashboard to manage the
          event flow. Start the event timer, release evidence in waves, and
          monitor participant progress. All settings are saved automatically.
        </div>
      </div>
    </div>
  );
}
