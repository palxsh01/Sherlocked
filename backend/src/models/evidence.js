import mongoose from "mongoose";

const evidenceSchema = mongoose.Schema(
    {
        phase: {
            type: Number,
            required: true
        },
        // image: {
        //     type: image,
        //     required: true
        // },
        desc: {
            type: String,
            required: true
        }
    }
);

const evidence = mongoose.model("evidence", evidenceSchema);

export default evidence;