//For Admin Users only
import Settings from "../models/settingsModel.js";

export async function getSettings(req, res) {
  try {
    const eventSettings = await Settings.find();
    res.status(200).json(eventSettings);
  } catch (error) {
    console.log("Error in getSettings controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function newSettings(req, res) {
  try {
    const {
      isActive,
      startTime,
      endTime,
      remainingDuration,
      currentPhase,
      maxPhases,
    } = req.body;

    const newSettings = new Settings({
      isActive: isActive,
      startTime: startTime,
      endTime: endTime,
      remainingDuration: remainingDuration,
      currentPhase: currentPhase,
      maxPhases: maxPhases,
    });

    await newSettings.save();

    res.status(201).json({ message: "Settings initialised successfully." });
  } catch (error) {
    console.log("Error in newSettings controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

const settingsID = process.env.SETTINGS_ID;

export async function startEvent(req, res) {
  try {
    const { startTime, endTime } = req.body;

    const startedEvent = await Settings.findByIdAndUpdate(settingsID, {
      isActive: true,
      startTime: startTime,
      endTime: endTime,
    });

    if (!startedEvent)
      return res.status(400).json({ message: "Event not started." });

    res.status(200).json({ message: "Event started successfully." });
  } catch (error) {
    console.log("Error in startEvent controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function pauseEvent(req, res) {
  try {
    const { remainingDuration } = req.body;

    const pauseEvent = await Settings.findByIdAndUpdate(settingsID, {
      isActive: false,
      endTime: null,
      remainingDuration: remainingDuration,
    });

    if (!pauseEvent)
      return res.status(400).json({ message: "Event not paused." });

    res.status(200).json({ message: "Event paused successfully." });
  } catch (error) {
    console.log("Error in pauseEvent controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function resumeEvent(req, res) {
  try {
    const { endTime } = req.body;

    const resumedEvent = await Settings.findByIdAndUpdate(settingsID, {
      isActive: true,
      endTime: endTime,
      remainingDuration: null
    });

    if (!resumedEvent) 
      return res.status(400).json({ message: "Event not resumed." });

    res.status(200).json({ message: "Event paused successfully." });
  } catch (error) {
    console.log("Error in resumeEvent controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function resetEvent(req, res) {
  try {
    const resettedEvent = await Settings.findByIdAndUpdate(settingsID, {
      isActive: false,
      startTime: null,
      endTime: null,
      remainingDuration: null,
      currentPhase: 0,
    });

    if (!resettedEvent)
      return res.status(404).json({ message: "Event not reset." });

    res.status(200).json({ message: "Event reset successfully." });
  } catch (error) {
    console.log("Error in resetEvent controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function updatePhase(req, res) {
  try {
    const { currentPhase } = req.body;

    const updatedPhase = await Settings.findByIdAndUpdate(settingsID, {
      currentPhase: currentPhase,
    });

    if (!updatedPhase)
      return res.status(404).json({ message: "Phase not updated." });

    res.status(200).json({ message: "Phase updated successfully." });
  } catch (error) {
    console.log("Error in updatePhase controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}
