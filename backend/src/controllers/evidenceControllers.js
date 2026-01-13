import evidence from '../models/evidence';

export async function getAllEvidence(req, res) {
  try {
    const evidences = await evidence.find().sort({createdAt : -1});
    res.status(200).json(evidences);
  } catch (error) {
    console.error("Error in getAllEvidence controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};