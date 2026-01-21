import mongoose from "mongoose";

const suspectSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    age: Number,
    background: String,
    relationship: String,
    alibi: String,
    motive: String,
    
  }
);

const Suspect = mongoose.model("Suspect", suspectSchema);

export default Suspect;