import mongoose from "mongoose";

const evidenceSchema = mongoose.Schema({
  phase: Number,
  title: String,
  type: String,
  media: {
    data: [Buffer],
    contentType: String
  },
  description: String,
  details: String
});

const Evidence = mongoose.model("Evidence", evidenceSchema);

export default Evidence;