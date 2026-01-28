import mongoose from "mongoose";

const settingsSchema = mongoose.Schema({
  isActive: Boolean,
  startTime: {
    type: String,
    default: null
  },
  endTime: {
    type: String,
    default: null
  },
  remainingDuration: {
    type: Number,
    default: null
  },
  currentPhase: Number,
  maxPhases: Number
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;