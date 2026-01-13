import mongoose from "mongoose";

const suspectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    alibi: {
      type: String,
      required: true
    },
    motive: {
      type: String,
      required: true
    },
    // evidenceLinks: {
    //   type: String[],
    //   required: true
    // }
  }
);

const Suspect = mongoose.model("Suspect", suspectSchema);

export default Suspect;