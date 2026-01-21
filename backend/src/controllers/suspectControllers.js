import Suspect from "../models/suspectModel.js";

//For all users
export async function getAllSuspects(req, res) {
  try {
    const suspects = await Suspect.find().sort({ createdAt : -1 });
    res.status(200).json(suspects);
  } catch (error) {
    console.error("Error in getAllSuspects controller: ", error);
    res.status(500).json({ message : "Internal Server Error." });
  }
}

//For admin users only
export async function getSuspect(req, res) {
  try {
    const suspect = await Suspect.findById(req.params.id);

    if (!suspect) return res.status(404).json({ message: "Suspect not found." });
    
    res.status(200).json(suspect);
  } catch (error) {
    console.error("Error in getSuspect controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function newSuspect(req, res) {
  try {
    const { name, role, age, background, relationship, alibi, motive } = req.body;
    
    const newSuspect = new Suspect({
      name: name,
      role: role,
      age: age,
      background: background,
      relationship: relationship,
      alibi: alibi,
      motive: motive,
    });

    await newSuspect.save();

    res.status(201).json({ message : "Suspect created successfully." });
  } catch (error) {
    console.error("Error in newSuspect controller: ", error);
    res.status(500).json({ message : "Internal Server Error." });
  }
}

export async function updateSuspect(req, res) {
  try {
    const { name, role, age, background, relationship, alibi, motive } = req.body;
    
    const updatedSuspect = await Suspect.findByIdAndUpdate(req.params.id, {
      name,
      role,
      age,
      background,
      relationship,
      alibi,
      motive,
    });

    if (!updatedSuspect) return res.status(404).json({ message : "Suspect not found." });

    res.status(200).json({ message : "Suspect updated successfully." });
  } catch (error) {
    console.error("Error in updateSuspect controller: ", error);
    res.status(500).json({ message : "Internal Server Error." });
  }
}

export async function deleteSuspect(req, res) {
  try {
    const deletedSuspect = await Suspect.findByIdAndDelete(req.params.id);

    if (!deletedSuspect) return res.status(404).json({ message : "Suspect not found." });

    res.status(200).json({ message : "Suspect deleted successfully." });
  } catch (error) {
    console.error("Error in deleteSuspect controller: ", error);
    res.status(500).json({ message : "Internal Server Error." });
  }
}