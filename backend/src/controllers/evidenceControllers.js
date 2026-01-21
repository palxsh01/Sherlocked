import Evidence from "../models/evidence";

export async function getAllEvidence(req, res) {
  try {
    const allEvidence = await Evidence.find().sort({ createdAt: -1 });
    res.status(200).json(allEvidence);
  } catch (error) {
    console.error("Error in getAllEvidence controller:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function getEvidence(req, res) {
  try {
    const evidence = await Evidence.findById(req.params.id);

    if (!evidence)
      return res.status(404).json({ message: "Evidence not found." });

    res.status(200).json(evidence);
  } catch (error) {
    console.error("Error in getEvidence controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

//For Admin Users Only
export async function newEvidence(req, res) {
  try {
    const { phase, title, media, description, details } =
      req.body;

    const newEvidence = new Evidence({
      phase: phase,
      title: title,
      media: media,
      description: description,
      details: details
    });

    await newEvidence.save();

    res.status(201).json({ message: "Evidence created successfully." });
  } catch (error) {
    console.error("Error in newEvidence controller: ", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function updateEvidence(req, res) {
  try {
    const { name, role, age, background, relationship, alibi, motive } =
      req.body;

    const updatedEvidence = await Evidence.findByIdAndUpdate(req.params.id, {
      name,
      role,
      age,
      background,
      relationship,
      alibi,
      motive,
    });

    if (!updatedEvidence)
      return res.status(404).json({ message: "Evidence not found." });

    res.status(200).json({ message: "Evidence updated successfully." });
  } catch (error) {
    console.error("Error in updateEvidence controller: ", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function deleteEvidence(req, res) {
  try {
    const deletedEvidence = await Evidence.findByIdAndDelete(req.params.id);

    if (!deletedEvidence)
      return res.status(404).json({ message: "Evidence not found." });

    res.status(200).json({ message: "Evidence deleted successfully." });
  } catch (error) {
    console.error("Error in deleteEvidence controller: ", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}